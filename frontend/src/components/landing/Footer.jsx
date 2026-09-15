import { Mail } from "lucide-react";

const SOCIALS = [
  { label: "VK", name: "ВКонтакте", href: "https://vk.com/vmig_ai" },
  { label: "TT", name: "TikTok", href: "https://www.tiktok.com/@vmig.ai" },
  { label: "YT", name: "YouTube", href: "https://youtube.com/@vmig_ai" },
];

export const Footer = () => (
  <footer data-testid="footer" className="border-t border-white/10 bg-[#141210] py-12">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <a href="#hero" data-testid="footer-logo" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Вмиг" className="w-7 h-7" />
          <span className="font-display font-bold text-lg tracking-tight">Вмиг</span>
        </a>
        <nav className="flex flex-wrap gap-x-7 gap-y-3">
          {[
            ["Проблема", "#problem"],
            ["Как работает", "#how-it-works"],
            ["Форматы", "#formats"],
            ["Тарифы", "#pricing"],
            ["Контакты", "#contacts"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              data-testid={`footer-link-${href.slice(1)}`}
              className="text-sm text-stone-500 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="mailto:vmig.ai@mail.ru"
          data-testid="footer-email-link"
          className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-orange-400 transition-colors"
        >
          <Mail size={15} />
          vmig.ai@mail.ru
        </a>
      </div>
      <div className="mt-10 flex flex-col gap-5 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone-600">© 2026 Вмиг (vmig.ai). Рекламные видео с ИИ — за минуты, а не за недели.</p>
        <nav className="flex items-center gap-3" aria-label="Мы в соцсетях">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`footer-social-${s.label.toLowerCase()}`}
              aria-label={`Вмиг в ${s.name}`}
              title={s.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[11px] font-bold tracking-tight text-stone-400 transition-colors hover:border-orange-500/50 hover:text-orange-400"
            >
              {s.label}
            </a>
          ))}
        </nav>
        <p className="font-mono text-xs text-stone-600">1 миг = 1 секунда видео с аватаром</p>
      </div>
    </div>
  </footer>
);
