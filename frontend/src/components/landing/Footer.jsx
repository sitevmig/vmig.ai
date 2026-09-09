import { Mail } from "lucide-react";

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
      <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone-600">© 2026 Вмиг (vmig.ai). Рекламные видео с ИИ — за минуты, а не за недели.</p>
        <p className="font-mono text-xs text-stone-600">1 миг = 1 секунда видео с аватаром</p>
      </div>
    </div>
  </footer>
);
