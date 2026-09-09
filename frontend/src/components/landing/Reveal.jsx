import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 36 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ index, eyebrow, title, subtitle }) => (
  <div className="max-w-3xl">
    <Reveal>
      <p
        data-testid={`section-${index}-eyebrow`}
        className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-orange-500"
      >
        {index} — {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.2}>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-stone-400">{subtitle}</p>
      </Reveal>
    )}
  </div>
);
