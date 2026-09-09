import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Problem } from "@/components/landing/Problem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Formats } from "@/components/landing/Formats";
import { Pricing } from "@/components/landing/Pricing";
import { Trial } from "@/components/landing/Trial";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export const DEFAULT_TARIFF = "Тестовый доступ (5 роликов бесплатно)";

function App() {
  const [tariff, setTariff] = useState(DEFAULT_TARIFF);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const el = document.querySelector(anchor.getAttribute("href"));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -72 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-slate-50 overflow-x-clip">
      <div className="grain-overlay" />
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <HowItWorks />
        <Formats />
        <Pricing onSelect={setTariff} />
        <Trial />
        <Contact tariff={tariff} onTariffChange={setTariff} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
