import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const FORMATS = [
  {
    badge: "Формат 01",
    title: "Видео с ИИ-аватаром",
    desc: "Говорящий аватар с русским липсинком. Для объяснений, офферов и сторителлинга.",
    img: "https://images.unsplash.com/photo-1695192695436-afd4f21ecdb2?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    link: "https://drive.google.com/drive/folders/1cF-qW-8uMi3hi-eNde6RspxhDDcLnS9j",
  },
  {
    badge: "Формат 02",
    title: "Слайдшоу из ваших фото",
    desc: "Загрузите фото и получите динамичный ролик с озвучкой. Входит в тариф без расхода мигов.",
    img: "https://images.unsplash.com/photo-1750056393326-8feed2a1c34f?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    link: "https://drive.google.com/drive/folders/1oT1vqPBRyRygBBHCQEvMer_HBfQ6h5bM",
  },
  {
    badge: "Формат 03",
    title: "Ролики для маркетплейсов",
    desc: "Карточка товара, описание, ключевые свойства — готовый ролик для маркетплейса и соцсетей.",
    img: "https://images.unsplash.com/photo-1597263072644-0e60b7541af4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    link: "https://drive.google.com/drive/u/0/folders/1oT1vqPBRyRygBBHCQEvMer_HBfQ6h5bM",
  },
];

export const Formats = () => (
  <section id="formats" data-testid="formats-section" className="relative py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHead
        index="03"
        eyebrow="Форматы"
        title="Три формата под разные задачи"
        subtitle="Ролики генерируются под форматы Reels, TikTok, Shorts и VK Клипы."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {FORMATS.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.12}>
            <div
              data-testid={`format-card-${i}`}
              className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-[#121217] transition-colors duration-300 hover:border-rose-500/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
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
              </div>
              <div className="p-7 pt-4">
                <h3 className="font-display text-lg sm:text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`format-examples-link-${i}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-400 transition-colors hover:text-rose-300"
                >
                  Смотреть примеры
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
