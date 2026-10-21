import { useEffect, useState } from "react";
import { Moon, Sun, ShoppingBag, Phone, Volume2, VolumeX, Clock } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";
import { BRAND, faNum } from "../data/menuData.js";

function OpenStatus() {
  const { isOpen, now } = useStore();
  const h = now.getHours();
  const m = now.getMinutes();

  return (
    <div className="hidden md:flex items-center gap-2 text-sm chip rounded-full px-3 py-1.5">
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          isOpen ? "bg-[#2EB872] pulse-dot" : "bg-[var(--red)] pulse-dot-closed"
        }`}
      />
      <span className="font-bold">{isOpen ? "اکنون آماده پذیرایی" : "پایان ساعت کاری"}</span>
      <span className="t-soft flex items-center gap-1 text-xs">
        <Clock size={13} />
        {faNum(h)}:{faNum(m).padStart(2, "۰")} / {faNum(BRAND.hours.open)}–{faNum(24)}
      </span>
    </div>
  );
}

export default function Navbar({ onOpenTray }) {
  const { theme, toggleTheme, trayCount, soundOn, toggleSound } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "card-shadow" : ""
      }`}
      style={{
        background: scrolled ? "color-mix(in srgb, var(--bg) 88%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1.5px solid var(--line)" : "1.5px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-[68px] flex items-center justify-between gap-3">
        {/* logo */}
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="w-11 h-11 rounded-full overflow-hidden sticker-shadow shrink-0">
            <img src="/logo.png" alt="برگر گایز" className="w-full h-full object-cover" />
          </span>
          <span className="font-black text-lg t-ink leading-none">
            برگر <span className="t-red">گایز</span>
            <span className="block text-[10px] font-medium t-soft tracking-wide">A TASTE OUT OF MATRIX</span>
          </span>
        </a>

        <OpenStatus />

        <div className="flex items-center gap-2">
          <a
            href={`tel:${BRAND.phone}`}
            className="chip rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="تماس تلفنی"
          >
            <Phone size={18} />
          </a>

          <button
            onClick={toggleSound}
            className="chip rounded-full w-10 h-10 hidden sm:flex items-center justify-center"
            aria-label={soundOn ? "قطع صدا" : "وصل صدا"}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={toggleTheme}
            className="chip rounded-full w-10 h-10 flex items-center justify-center"
            aria-label="تغییر تم ماتریکس"
            title="تم ماتریکس"
          >
            {theme === "pop" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={onOpenTray}
            className="relative btn-primary rounded-full px-4 h-10 flex items-center gap-2 font-extrabold text-sm"
            aria-label="سینی سفارش"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline">سینی من</span>
            {trayCount > 0 && (
              <span className="pop-in absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full bg-[var(--yellow)] text-[#142850] text-xs font-black flex items-center justify-center border-2 border-[var(--bg)]">
                {faNum(trayCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
