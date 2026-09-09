import { Check, Zap, Plus } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const TARIFFS = [
  {
    id: "start",
    name: "Старт",
    forWhom: "Небольшой бизнес и блогеры",
    price: "1 990",
    migs: "120 мигов",
    migsDesc: "≈ 8 роликов с аватаром по 15 секунд",
    features: [
      "Слайдшоу из своих фото — без лимита",
      "Автопостинг в соцсети",
      "Базовая аналитика охватов",
      "Качество 720p",
    ],
    popular: false,
    cta: "Выбрать Старт",
  },
  {
    id: "pro",
    name: "Про",
    forWhom: "Продавцы и активный контент",
    price: "5 500",
    migs: "315 мигов",
    migsDesc: "≈ 21 ролик с аватаром по 15 секунд",
    features: [
      "Всё из тарифа Старт",
      "Полная аналитика с прогнозом контента",
      "Свой фон по промпту",
      "Замена аватара и своя музыка",
      "Качество 720p",
    ],
    popular: true,
    cta: "Выбрать Про",
  },
  {
    id: "max",
    name: "Макс",
    forWhom: "Агентства и активные продавцы",
    price: "11 900",
    migs: "690 мигов",
    migsDesc: "≈ 46 роликов с аватаром по 15 секунд",
    features: [
      "Всё из тарифа Про",
      "Объём для ежедневного постинга",
      "Приоритетная генерация",
      "Качество 720p",
    ],
    popular: false,
    cta: "Выбрать Макс",
  },
  {
    id: "business",
    name: "Бизнес",
    forWhom: "Команды и крупные агентства",
    price: "37 900",
    migs: "1 200 мигов",
    migsDesc: "≈ 80 роликов с аватаром по 15 секунд",
    features: [
      "Всё из тарифа Макс",
      "5 учётных записей (больше — по согласованию)",
      "Персональные условия тарифа",
    ],
    popular: false,
    cta: "Обсудить условия",
  },
];

const PACKAGES = [
  { seconds: "30 секунд", price: "690 ₽" },
  { seconds: "60 секунд", price: "1 290 ₽" },
  { seconds: "90 секунд", price: "1 790 ₽" },
];

export const Pricing = ({ onSelect }) => {
  const choose = (t) => {
    onSelect(`${t.name} (${t.price} ₽)`);
    document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-24 sm:py-32 bg-[#0a0a0e]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-rose-600/10 blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="04"
          eyebrow="Тарифы"
          title="Прозрачные тарифы под ваш масштаб"
          subtitle="1 миг = 1 секунда видео с аватаром. Слайдшоу и фоны лимит не расходуют."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TARIFFS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1} className="h-full">
              <div
                data-testid={`tariff-card-${t.id}`}
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  t.popular
                    ? "border-rose-500/60 bg-[#181820] shadow-[0_0_60px_rgba(225,29,72,0.15)] xl:-translate-y-3"
                    : "border-white/10 bg-[#121217] hover:border-white/25"
                }`}
              >
                {t.popular && (
                  <span
                    data-testid="tariff-popular-badge"
                    className="animate-pulse-glow absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase text-white"
                  >
                    Популярный
                  </span>
                )}
                <p className="text-xs text-slate-500">{t.forWhom}</p>
                <h3 className="mt-1.5 font-display text-2xl font-bold">{t.name}</h3>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold tracking-tight">{t.price}</span>
                  <span className="text-sm text-slate-400">₽/мес</span>
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-rose-400">
                    <Zap size={14} />
                    {t.migs}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{t.migsDesc}</p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-rose-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choose(t)}
                  data-testid={`tariff-cta-${t.id}`}
                  className={`mt-7 w-full rounded-full py-3.5 text-sm font-semibold transition-colors duration-200 ${
                    t.popular
                      ? "bg-rose-600 text-white hover:bg-rose-500"
                      : "border border-white/15 text-slate-100 hover:border-rose-500/60 hover:text-white"
                  }`}
                >
                  {t.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div
            data-testid="extra-packages"
            className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-[#121217] p-7 sm:flex-row sm:justify-between"
          >
            <p className="flex items-center gap-3 text-sm font-semibold text-slate-200">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-rose-600/15 text-rose-500">
                <Plus size={16} />
              </span>
              Закончились миги? Докупайте пакетом в любой момент:
            </p>
            <div className="flex flex-wrap gap-3">
              {PACKAGES.map((p) => (
                <span
                  key={p.seconds}
                  data-testid={`package-${p.seconds.replace(/\s/g, "-")}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300"
                >
                  {p.seconds} — <span className="font-semibold text-white">{p.price}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
