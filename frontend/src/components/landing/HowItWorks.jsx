import { PenLine, Sparkles, Share2, Mic, Image, Layers } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const STEPS = [
  {
    step: "01",
    icon: PenLine,
    title: "Опишите задачу",
    desc: "Введите текст или опишите ролик своими словами. Или просто загрузите нужные фото.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Платформа генерирует",
    desc: "ИИ создаёт видео с аватаром, озвучкой и синхронной артикуляцией на русском языке.",
  },
  {
    step: "03",
    icon: Share2,
    title: "Скачивайте и публикуйте",
    desc: "Готовый вертикальный ролик под Reels, TikTok, Shorts и VK Клипы.",
  },
];

const FEATURES = [
  { icon: Mic, title: "Живой русский липсинк", desc: "Аватар говорит естественно, артикуляция совпадает со звуком" },
  { icon: Image, title: "Ваши фото и товары", desc: "Загрузите изображения — платформа соберёт из них ролик" },
  { icon: Layers, title: "Готовые фоны и переходы", desc: "B-roll входит во все тарифы без ограничений" },
];

export const HowItWorks = () => (
  <section id="how-it-works" data-testid="how-it-works-section" className="relative py-24 sm:py-32 bg-[#0a0a0e]">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHead
        index="02"
        eyebrow="Как работает"
        title="Всё, что нужно — браузер и пять минут"
        subtitle="Никакой съёмки, микрофона и монтажной программы. Опишите, что нужно сказать, — остальное платформа берёт на себя."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {STEPS.map(({ step, icon: Icon, title, desc }, i) => (
          <Reveal key={step} delay={i * 0.12}>
            <div
              data-testid={`step-card-${step}`}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#121217] p-7 transition-colors duration-300 hover:border-rose-500/40"
            >
              <span className="pointer-events-none absolute -top-4 right-4 font-display text-7xl font-extrabold text-white/[0.04] transition-colors duration-300 group-hover:text-rose-600/10">
                {step}
              </span>
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-rose-600/15 text-rose-500">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-display text-lg sm:text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delay={0.15 + i * 0.1}>
            <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-lg bg-white/5 text-rose-400">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-100">{title}</p>
                <p className="mt-1 text-sm text-slate-500">{desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
