import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Reveal, SectionHead } from "./Reveal";

const FORMATS = [
  {
    badge: "Формат 01",
    title: "Видео с ИИ-аватаром",
    desc: "Говорящий аватар с русским липсинком. Для объяснений, офферов и сторителлинга.",
    img: "/videos/poster-avatar.jpg",
    videos: [{ src: "/videos/ex2.mp4", name: "Пример: говорящий ИИ-аватар" }],
  },
  {
    badge: "Формат 02",
    title: "Слайдшоу из ваших фото",
    desc: "Загрузите фото и получите динамичный ролик с озвучкой. Входит в тариф без расхода мигов.",
    img: "/videos/poster-dynamic.jpg",
    videos: [{ src: "/videos/ex1.mp4", name: "Пример: динамичный ролик" }],
  },
];

export const Formats = () => {
  const [openIdx, setOpenIdx] = useState(null);
  const active = openIdx !== null ? FORMATS[openIdx] : null;

  return (
    <section id="formats" data-testid="formats-section" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="03"
          eyebrow="Форматы"
          title="Два формата под разные задачи"
          subtitle="Ролики генерируются под форматы Reels, TikTok, Shorts и VK Клипы. Нажмите «Смотреть пример» — видео откроется прямо на странице."
        />

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
          {FORMATS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.12}>
              <div
                data-testid={`format-card-${i}`}
                className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#201D1A] transition-colors duration-300 hover:border-orange-500/40"
              >
                <button
                  onClick={() => setOpenIdx(i)}
                  data-testid={`format-video-open-${i}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                  aria-label={`Смотреть пример: ${f.title}`}
                >
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201D1A] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#141210]/80 backdrop-blur px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-orange-400">
                    {f.badge}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-600/90 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75">
                      <Play size={22} className="ml-1" />
                    </span>
                  </span>
                </button>
                <div className="p-7 pt-4">
                  <h3 className="font-display text-lg sm:text-xl font-semibold">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{f.desc}</p>
                  <button
                    onClick={() => setOpenIdx(i)}
                    data-testid={`format-examples-button-${i}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-400 transition-colors hover:text-orange-300"
                  >
                    <Play size={15} />
                    Смотреть пример
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
          className="max-w-md border-white/10 bg-[#1B1815] text-stone-100"
        >
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-lg text-white">
                  {active.title} — пример
                </DialogTitle>
              </DialogHeader>
              <div className="mx-auto grid w-full max-w-xs gap-4">
                {active.videos.map((v) => (
                  <div
                    key={v.src}
                    data-testid={`format-video-${v.src}`}
                    className="overflow-hidden rounded-xl border border-white/10 bg-black"
                  >
                    <video
                      src={v.src}
                      poster={active.img}
                      controls
                      playsInline
                      preload="metadata"
                      className="aspect-[9/16] w-full object-cover"
                    />
                    <p className="truncate px-3 py-2 text-xs text-stone-400">{v.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
