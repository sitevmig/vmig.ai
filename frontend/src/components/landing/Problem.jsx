import { XCircle } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const STATS = [
  { metric: "от 4 000 ₽", label: "стоит один Reels у фрилансера", desc: "Долго и результат непредсказуем" },
  { metric: "от 120 000 ₽", label: "серия из 10 роликов у подрядчика", desc: "Бюджет не для малого бизнеса" },
  { metric: "3 дня – 3 недели", label: "от идеи до готового ролика", desc: "Контент-план срывается" },
];

const PAINS = [
  "Съёмка, монтаж, озвучка и оформление — четыре разных подрядчика",
  "Каждая правка стоит денег и занимает от трёх дней",
  "Для рабочей рекламы нужно 10–15 разных роликов в месяц",
];

export const Problem = () => (
  <section id="problem" data-testid="problem-section" className="relative py-16 sm:py-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <SectionHead
        index="01"
        eyebrow="Проблема"
        title="Видео нужно постоянно. А делать его дорого"
        subtitle="При таких ценах малый бизнес выпускает один-два ролика — или не выпускает вовсе. Знакомо?"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.metric} delay={i * 0.12}>
            <div
              data-testid={`problem-stat-${i}`}
              className="group h-full rounded-2xl border border-white/10 bg-[#201D1A] p-7 transition-colors duration-300 hover:border-orange-500/40"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-orange-500">{s.metric}</p>
              <p className="mt-3 text-base font-semibold text-stone-100">{s.label}</p>
              <p className="mt-2 text-sm text-stone-500">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {PAINS.map((pain, i) => (
          <Reveal key={pain} delay={0.1 + i * 0.1}>
            <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-5">
              <XCircle size={18} className="mt-0.5 shrink-0 text-orange-500" />
              <p className="text-sm leading-relaxed text-stone-300">{pain}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
