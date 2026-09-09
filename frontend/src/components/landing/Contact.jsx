import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Copy, Send, Loader2, Clock } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const EMAIL = "vmig.ai@mail.ru";

export const TARIFF_OPTIONS = [
  "Тестовый доступ (5 роликов бесплатно)",
  "Старт (1 990 ₽)",
  "Про (5 500 ₽)",
  "Макс (11 900 ₽)",
  "Бизнес (37 900 ₽)",
  "Другой вопрос",
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors duration-200 focus:border-rose-500/60 focus:bg-white/[0.06]";

export const Contact = ({ tariff, onTariffChange }) => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Почта скопирована", { description: EMAIL });
    } catch {
      toast.info(EMAIL);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, { ...form, tariff });
      toast.success("Заявка отправлена!", {
        description: "Команда Вмиг свяжется с вами в ближайшее время.",
      });
      setForm({ name: "", contact: "", message: "" });
      onTariffChange(TARIFF_OPTIONS[0]);
    } catch {
      const body = encodeURIComponent(
        `Имя: ${form.name}\nКонтакт: ${form.contact}\nТариф: ${tariff}\n\n${form.message}`
      );
      toast.error("Не удалось отправить заявку", {
        description: "Напишите нам напрямую на почту — кнопка ниже.",
        action: {
          label: "Написать на почту",
          onClick: () => window.open(`mailto:${EMAIL}?subject=Заявка с сайта Вмиг&body=${body}`),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" data-testid="contacts-section" className="relative py-24 sm:py-32 bg-[#0a0a0e]">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHead
            index="05"
            eyebrow="Контакты"
            title="Начните создавать ролики Вмиг"
            subtitle="Оставьте заявку на бесплатный тест или задайте любой вопрос — отвечаем лично, без ботов."
          />

          <Reveal delay={0.25}>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#121217] p-5">
                <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-rose-600/15 text-rose-500">
                  <Mail size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">Вопросы и подключение</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-testid="contact-email-link"
                    className="block truncate text-base font-semibold text-white hover:text-rose-400 transition-colors"
                  >
                    {EMAIL}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  data-testid="copy-email-button"
                  className="p-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-rose-500/50 transition-colors"
                  aria-label="Скопировать почту"
                >
                  <Copy size={16} />
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#121217] p-5">
                <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-rose-600/15 text-rose-500">
                  <Clock size={20} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">Скорость ответа</p>
                  <p className="text-base font-semibold text-white">В течение рабочего дня</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form
            onSubmit={submit}
            data-testid="lead-form"
            className="rounded-2xl border border-white/10 bg-[#121217] p-7 sm:p-9"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="lead-name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Ваше имя *
                </label>
                <input
                  id="lead-name"
                  data-testid="lead-name-input"
                  required
                  maxLength={120}
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Иван Иванов"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="lead-contact" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email, телефон или Telegram *
                </label>
                <input
                  id="lead-contact"
                  data-testid="lead-contact-input"
                  required
                  maxLength={200}
                  value={form.contact}
                  onChange={set("contact")}
                  placeholder="example@mail.ru или @username"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="lead-tariff" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Интересующий тариф / вопрос
                </label>
                <select
                  id="lead-tariff"
                  data-testid="lead-tariff-select"
                  value={tariff}
                  onChange={(e) => onTariffChange(e.target.value)}
                  className={`${inputCls} appearance-none cursor-pointer [&>option]:bg-[#121217]`}
                >
                  {TARIFF_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lead-message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Комментарий или задача
                </label>
                <textarea
                  id="lead-message"
                  data-testid="lead-message-textarea"
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Опишите, какие ролики хотите создавать..."
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="lead-submit-button"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-rose-500 hover:shadow-[0_0_40px_rgba(225,29,72,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                )}
                {loading ? "Отправляем..." : "Отправить заявку в Вмиг"}
              </button>
              <p className="text-center text-xs text-slate-600">
                Нажимая кнопку, вы соглашаетесь на обработку заявки командой Вмиг
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
