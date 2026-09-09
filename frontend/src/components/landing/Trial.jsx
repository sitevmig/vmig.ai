import { Gift, Zap, CreditCard, HeartHandshake } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  { icon: Zap, num: "1", title: "Регистрация", text: "2 минуты, без привязки банковской карты" },
  { icon: Gift, num: "2", title: "5 роликов бесплатно", text: "Генерация в тот же день" },
  { icon: HeartHandshake, num: "3", title: "Оплата", text: "Только если понравится результат" },
];

export const Trial = () => (
  <section id="trial" data-testid="trial-section" className="relative py-24 sm:py-32">
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-b from-[#262219] to-[#1B1815] p-10 sm:p-14 text-center">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-600/20 blur-[100px] pointer-events-none" />
          <p className="relative font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-orange-500">
            Бесплатный тест
          </p>
          <h2
            data-testid="trial-title"
            className="relative mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
          >
            Первые пять роликов — бесплатно
          </h2>
          <p className="relative mt-4 text-base sm:text-lg text-stone-400">
            Посмотрите на результат, прежде чем принимать решение.
          </p>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, num, title, text }) => (
              <div
                key={num}
                data-testid={`trial-step-${num}`}
                className="rounded-2xl border border-white/10 bg-[#141210]/60 backdrop-blur p-6"
              >
                <span className="mx-auto flex items-center justify-center w-11 h-11 rounded-xl bg-orange-600/15 text-orange-500">
                  <Icon size={20} />
                </span>
                <p className="mt-4 text-sm font-semibold text-stone-100">{title}</p>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-500">{text}</p>
              </div>
            ))}
          </div>

          <a
            href="#contacts"
            data-testid="trial-cta-button"
            className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-orange-600 px-8 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-[0_0_40px_rgba(232,105,47,0.4)]"
          >
            <CreditCard size={16} />
            Начать без карты
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);
