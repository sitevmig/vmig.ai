import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Gift, CreditCard, CheckCircle2 } from "lucide-react";

const Line = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const HIGHLIGHTS = [
  { icon: Zap, text: "5 минут от идеи до ролика" },
  { icon: Gift, text: "Первые три ролика бесплатно" },
  { icon: CreditCard, text: "Без привязки карты" },
];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhone = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="hero" ref={ref} data-testid="hero-section" className="relative pt-24 pb-14 sm:pt-28 sm:pb-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-orange-600/15 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
        <motion.div style={{ y: yText }}>
          <h1
            data-testid="hero-title"
            className="font-display font-extrabold tracking-tight leading-[1.02] text-4xl sm:text-5xl lg:text-6xl"
          >
            <Line delay={0.15}>Вмиг делает</Line>
            <Line delay={0.28}>
              <span className="text-orange-500">ролик</span> за минуты,
            </Line>
            <Line delay={0.41}>а не за недели</Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            data-testid="hero-subtitle"
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-stone-400"
          >
            Рекламные видео для Reels, TikTok, Shorts и VK Клипов с ИИ-аватаром и живым русским
            липсинком. Без съёмки, монтажёра и подрядчика — только браузер и пять минут.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm text-stone-300"
              >
                <Icon size={14} className="text-orange-500" />
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contacts"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 rounded-full bg-orange-600 px-7 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:bg-orange-500 hover:shadow-[0_0_40px_rgba(232,105,47,0.4)]"
            >
              Создать первый ролик бесплатно
              <Zap size={16} className="transition-transform duration-300 group-hover:scale-125" />
            </a>
            <a
              href="#pricing"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm sm:text-base font-semibold text-stone-200 transition-colors duration-300 hover:border-orange-500/60 hover:text-white"
            >
              Посмотреть тарифы
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: yPhone }} className="relative mx-auto w-full max-w-[320px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            data-testid="hero-phone"
            className="relative rounded-[2.5rem] border border-white/15 bg-[#201D1A] p-2.5 shadow-[0_40px_120px_rgba(232,105,47,0.25)]"
          >
            <div className="relative overflow-hidden rounded-[2rem] aspect-[9/19]">
              <video
                src="/videos/ex2.mp4"
                poster="/videos/poster-avatar.jpg"
                autoPlay
                muted
                loop
                playsInline
                data-testid="hero-video"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/60 via-transparent to-[#141210]/30 pointer-events-none" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black/70" />
              <span className="absolute bottom-4 left-4 rounded-full bg-[#141210]/80 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase text-orange-400">
                Реальный ролик Вмиг
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="animate-float absolute -left-16 top-16 hidden sm:flex items-center gap-2 rounded-xl border border-white/10 bg-[#201D1A]/90 backdrop-blur px-4 py-3"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-xs font-medium text-stone-200">Русский липсинк 100%</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="animate-float absolute -right-12 bottom-24 hidden sm:block rounded-xl border border-white/10 bg-[#201D1A]/90 backdrop-blur px-4 py-3"
            style={{ animationDelay: "1.5s" }}
          >
            <p className="font-mono text-[10px] tracking-widest uppercase text-orange-500">Форматы</p>
            <p className="mt-1 text-xs font-medium text-stone-200">Reels · TikTok · Shorts</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
