from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import time
from pathlib import Path
from pydantic import BaseModel, Field
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone
from collections import defaultdict
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
LEAD_EMAIL = os.environ["LEAD_EMAIL"]

logger = logging.getLogger(__name__)

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    contact: str = Field(min_length=3, max_length=200)
    tariff: str = Field(default="Тестовый доступ (3 ролика бесплатно)", max_length=120)
    message: str = Field(default="", max_length=2000)


_hits: dict[str, list[float]] = defaultdict(list)


def _throttle(ip: str) -> None:
    now = time.time()
    lst = [t for t in _hits[ip] if now - t < 600]
    if len(lst) >= 5:
        raise HTTPException(status_code=429, detail="Слишком много заявок. Попробуйте позже.")
    lst.append(now)
    _hits[ip] = lst


@api_router.get("/")
async def root():
    return {"message": "Vmig API"}


@api_router.post("/leads")
async def create_lead(lead: LeadCreate, request: Request):
    _throttle(request.client.host if request.client else "unknown")
    doc = {
        "id": str(uuid.uuid4()),
        "name": lead.name.strip(),
        "contact": lead.contact.strip(),
        "tariff": lead.tariff,
        "message": lead.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.leads.insert_one(doc)

    subject = f"Новая заявка с сайта Вмиг — {doc['tariff']}"
    row = lambda label, value: (
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px;vertical-align:top;white-space:nowrap">{label}</td>'
        f'<td style="padding:8px 16px;color:#0F172A;font-size:14px">{value}</td></tr>'
    )
    html = (
        '<table role="presentation" width="100%" style="background:#F1F5F9;padding:24px 0">'
        '<tr><td align="center"><table role="presentation" width="560" style="background:#FFFFFF;'
        'border-radius:12px;overflow:hidden;font-family:Arial,sans-serif">'
        '<tr><td style="background:#E11D48;padding:20px 24px;color:#FFFFFF;font-size:18px;font-weight:bold">'
        'Новая заявка с лендинга Вмиг</td></tr>'
        '<tr><td style="padding:16px 8px"><table role="presentation" width="100%">'
        + row("Имя", escape(doc["name"]))
        + row("Контакт", escape(doc["contact"]))
        + row("Тариф / вопрос", escape(doc["tariff"]))
        + row("Комментарий", escape(doc["message"]) or "—")
        + row("Дата", escape(doc["created_at"][:19].replace("T", " ")) + " UTC")
        + '</table></td></tr>'
        f'<tr><td style="padding:16px 24px;font-size:12px;color:#94A3B8">Отправлено формой сайта '
        f'{escape(EMAIL_FROM_NAME)}. Ответьте клиенту на указанный контакт.</td></tr>'
        '</table></td></tr></table>'
    )
    email_id = await send_email(to=LEAD_EMAIL, subject=subject, html=html)
    return {"status": "success", "id": doc["id"], "email_id": email_id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
