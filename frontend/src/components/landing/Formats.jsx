import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Reveal, SectionHead } from "./Reveal";

const FORMATS = [
  {
    badge: "Формат 01",
    title: "Видео с ИИ-аватаром",
    desc: "Говорящий аватар с русским липсинком. Для объяснений, офферов и сторителлинга.",
    img: "https://images.unsplash.com/photo-1695192695436-afd4f21ecdb2?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    link: "https://drive.google.com/drive/folders/1cF-qW-8uMi3hi-eNde6RspxhDDcLnS9j",
    videos: [
      { id: "1f8qgMd0ShfEdrhSqMpB1LweBftrAkFGf", name: "Не трогайте зелёные задачи" },
      { id: "1el_75bZfjKRC1tZo3wcTnacTmvnotymB", name: "Приоритет, которого нет" },
      { id: "1e4jFI1xD5ZS67E4HclexeRsXPw1hRObM", name: "Хороший ролик Вам не нужен" },
    ],
  },
  {
    badge: "Формат 02",
    title: "Слайдшоу из ваших фото",
    desc: "Загрузите фото и получите динамичный ролик с озвучкой. Входит в тариф без расхода мигов.",
    img: "https://images.unsplash.com/photo-1750056393326-8feed2a1c34f?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    link: "https://drive.google.com/drive/folders/1oT1vqPBRyRygBBHCQEvMer_HBfQ6h5bM",
    videos: [
      { id: "1eaMR0bPtNSswzrZiRwCTpAp8L6ok2brA", name: "Вы заметили слишком поздно" },
      { id: "1dUCKguYwpvky2LX9IyavY6d0ETzZBpkI", name: "Сделали за 7 недель" },
    ],
  },
  {
    badge: "Формат 03",
    title: "Ролики для маркетплейсов",
    desc: "Карточка товара, описание, ключевые свойства — готовый ролик для маркетплейса и соцсетей.",
    img: "https://images.unsplash.com/photo-1597263072644-0e60b7541af4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    link: "https://drive.google.com/drive/u/0/folders/1oT1vqPBRyRygBBHCQEvMer_HBfQ6h5bM",
    videos: [
      { id: "1eaMR0bPtNSswzrZiRwCTpAp8L6ok2brA", name: "Вы заметили слишком поздно" },
      { id: "1dUCKguYwpvky2LX9IyavY6d0ETzZBpkI", name: "Сделали за 7 недель" },
    ],
  },
];

export const Formats = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const active = openIdx !== null ? FORMATS[openIdx] : null;

  return (
    <section id="formats" data-testid="formats-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="03"
          eyebrow="Форматы"
          title="Три формата под разные задачи"
          subtitle="Ролики генерируются под форматы Reels, TikTok, Shorts и VK Клипы. Нажмите «Смотреть примеры» — реальные видео откроются прямо на странице."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.12}>
              <div
                data-testid={`format-card-${i}`}
                className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#121217] transition-colors duration-300 hover:border-rose-500/40"
              >
                <button
                  onClick={() => setOpenIdx(i)}
                  data-testid={`format-video-open-${i}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                  aria-label={`Смотреть примеры: ${f.title}`}
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#070709]/80 backdrop-blur px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-rose-400">
                    {f.badge}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-600/90 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                      <Play size={22} className="ml-1" />
                    </span>
                  </span>
                </button>
                <div className="p-7 pt-4">
                  <h3 className="font-display text-lg sm:text-xl font-semibold">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                  <button
                    onClick={() => setOpenIdx(i)}
                    data-testid={`format-examples-button-${i}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-400 transition-colors hover:text-rose-300"
                  >
                    <Play size={15} />
                    Смотреть примеры ({f.videos.length})
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(v) => !v && setOpenIdx(null)}>
        <DialogContent
          data-testid="format-video-modal"
          className="max-w-3xl border-white/10 bg-[#0c0c10] text-slate-100"
        >
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg text-white">
                  {active.title} — примеры
                </DialogTitle>
              </DialogHeader>
              <div
                className={`grid gap-4 ${
                  active.videos.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2 sm:max-w-lg"
                }`}
              >
                {active.videos.map((v) => (
                  <div
                    key={v.id}
                    data-testid={`format-video-${v.id}`}
                    className="overflow-hidden rounded-xl border border-white/10 bg-black"
                  >
                    <iframe
                      src={`https://drive.google.com/file/d/${v.id}/preview`}
                      title={v.name}
                      loading="lazy"
                      allow="autoplay"
                      className="aspect-[9/16] w-full"
                    />
                    <p className="truncate px-3 py-2 text-xs text-slate-400">{v.name}</p>
                  </div>
                ))}
              </div>
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="format-modal-folder-link"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-rose-400"
              >
                Открыть папку со всеми примерами
                <ArrowUpRight size={13} />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
