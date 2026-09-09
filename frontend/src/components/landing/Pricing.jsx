import { useState } from "react";
import { Check, Zap, Plus, Calculator } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";

const DURATIONS = [15, 30, 60];

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

const migsOf = (t) => parseInt(t.migs.replace(/\s/g, ""), 10);
const priceOf = (t) => parseInt(t.price.replace(/\s/g, ""), 10);

export const Pricing = ({ onSelect }) => {
  const [videos, setVideos] = useState(10);
  const [duration, setDuration] = useState(15);
  const needMigs = videos * duration;
  const recommended =
    TARIFFS.find((t) => migsOf(t) >= needMigs) || TARIFFS[TARIFFS.length - 1];
  const perVideo = Math.round(priceOf(recommended) / videos);

  const choose = (t) => {
    onSelect(`${t.name} (${t.price} ₽)`);
    document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-24 sm:py-32 bg-[#181512]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-orange-600/10 blur-[140px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="04"
          eyebrow="Тарифы"
          title="Прозрачные тарифы под ваш масштаб"
          subtitle="1 миг = 1 секунда видео с аватаром. Слайдшоу и фоны лимит не расходуют."
        />

        <Reveal>
          <div
            data-testid="mig-calculator"
            className="mt-12 rounded-2xl border border-white/10 bg-[#201D1A] p-7 sm:p-9"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600/15 text-orange-500">
                <Calculator size={18} />
              </span>
              <h3 className="font-display text-lg sm:text-xl font-semibold">
                Сколько роликов вам нужно?
              </h3>
            </div>
            <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor="mig-calc-slider" className="text-sm text-stone-400">
                    Роликов с аватаром в месяц
                  </label>
                  <span data-testid="mig-calc-videos-value" className="font-display text-3xl font-extrabold text-white">
                    {videos}
                  </span>
                </div>
                <input
                  id="mig-calc-slider"
                  data-testid="mig-calc-slider"
                  type="range"
                  min={1}
                  max={80}
                  value={videos}
                  onChange={(e) => setVideos(Number(e.target.value))}
                  className="mt-4 w-full accent-orange-600 cursor-pointer"
                />
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="text-sm text-stone-400">Длина ролика:</span>
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      data-testid={`mig-calc-duration-${d}`}
                      onClick={() => setDuration(d)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        duration === d
                          ? "bg-orange-600 text-white"
                          : "border border-white/15 text-stone-300 hover:border-orange-500/60"
                      }`}
                    >
                      {d} сек
                    </button>
                  ))}
                </div>
              </div>
              <div
                data-testid="mig-calc-result"
                className="rounded-xl border border-orange-500/30 bg-orange-600/5 p-6"
              >
                <p className="text-xs text-stone-500">
                  Вам нужно ≈ <span className="font-semibold text-stone-200">{needMigs} мигов</span> в месяц
                </p>
                <p className="mt-2 font-display text-xl font-bold">
                  Ваш тариф — <span className="text-orange-500">{recommended.name}</span>
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  {recommended.price} ₽/мес · ≈ {perVideo} ₽ за ролик
                </p>
                <button
                  onClick={() => choose(recommended)}
                  data-testid="mig-calc-cta"
                  className="mt-4 w-full rounded-full bg-orange-600 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-500"
                >
                  Оставить заявку на «{recommended.name}»
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TARIFFS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1} className="h-full">
              <div
                data-testid={`tariff-card-${t.id}`}
                className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
                  t.popular
                    ? "border-orange-500/60 bg-[#262219] shadow-[0_0_60px_rgba(232,105,47,0.15)] xl:-translate-y-3"
                    : "border-white/10 bg-[#201D1A] hover:border-white/25"
                } ${t.id === recommended.id ? "ring-2 ring-orange-500/70" : ""}`}
              >
                {t.popular && (
                  <span
                    data-testid="tariff-popular-badge"
                    className="animate-pulse-glow absolute -top-3.5 left-4 rounded-full bg-orange-600 px-4 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase text-white"
                  >
                    Популярный
                  </span>
                )}
                {t.id === recommended.id && (
                  <span
                    data-testid={`tariff-recommended-${t.id}`}
                    className="absolute -top-3 right-4 rounded-full border border-orange-500/50 bg-[#141210] px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-orange-400"
                  >
                    Подходит вам
                  </span>
                )}
                <p className="text-xs text-stone-500">{t.forWhom}</p>
                <h3 className="mt-1.5 font-display text-2xl font-bold">{t.name}</h3>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold tracking-tight">{t.price}</span>
                  <span className="text-sm text-stone-400">₽/мес</span>
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-orange-400">
                    <Zap size={14} />
                    {t.migs}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">{t.migsDesc}</p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-stone-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-orange-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => choose(t)}
                  data-testid={`tariff-cta-${t.id}`}
                  className={`mt-7 w-full rounded-full py-3.5 text-sm font-semibold transition-colors duration-200 ${
                    t.popular
                      ? "bg-orange-600 text-white hover:bg-orange-500"
                      : "border border-white/15 text-stone-100 hover:border-orange-500/60 hover:text-white"
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
            className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-white/10 bg-[#201D1A] p-7 sm:flex-row sm:justify-between"
          >
            <p className="flex items-center gap-3 text-sm font-semibold text-stone-200">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-600/15 text-orange-500">
                <Plus size={16} />
              </span>
              Закончились миги? Докупайте пакетом в любой момент:
            </p>
            <div className="flex flex-wrap gap-3">
              {PACKAGES.map((p) => (
                <span
                  key={p.seconds}
                  data-testid={`package-${p.seconds.replace(/\s/g, "-")}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-stone-300"
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
