const ITEMS = [
  "Reels",
  "TikTok",
  "Shorts",
  "VK Клипы",
  "ИИ-аватар",
  "Русский липсинк",
  "Без съёмки",
  "5 минут",
  "Слайдшоу из фото",
  "Автопостинг",
];

export const Marquee = () => (
  <div data-testid="marquee" className="relative border-y border-white/10 bg-[#0c0c10] py-5 overflow-hidden">
    <div className="flex w-max animate-marquee">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
          {ITEMS.map((item) => (
            <span key={`${copy}-${item}`} className="flex items-center">
              <span className="px-8 font-display text-sm sm:text-base font-medium tracking-wide text-slate-400">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
