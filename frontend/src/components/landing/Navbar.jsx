import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";

const LINKS = [
  { label: "Проблема", href: "#problem" },
  { label: "Как работает", href: "#how-it-works" },
  { label: "Форматы", href: "#formats" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#070709]/80 border-b border-white/10"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#hero" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600 text-white transition-transform duration-300 group-hover:rotate-12">
            <Zap size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Вмиг<span className="text-rose-500">.ai</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" data-testid="nav-links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.slice(1)}`}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contacts"
            data-testid="nav-cta-button"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-rose-500"
          >
            <Zap size={14} />
            Попробовать бесплатно
          </a>
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          data-testid="mobile-menu"
          className="lg:hidden border-t border-white/10 bg-[#0c0c10] px-5 py-4 flex flex-col gap-1"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              data-testid={`mobile-nav-link-${l.href.slice(1)}`}
              className="py-2.5 text-sm text-slate-300 hover:text-rose-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacts"
            onClick={() => setOpen(false)}
            data-testid="mobile-nav-cta"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <Zap size={14} />
            Попробовать бесплатно
          </a>
        </nav>
      )}
    </header>
  );
};
