import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";
import { BLOOD_LEVELS, faNum, priceLabel } from "../data/menuData.js";
import { useStore, findItem } from "../context/StoreContext.jsx";
import ItemArt from "./ItemArt.jsx";
import SectionTitle from "./SectionTitle.jsx";

export default function BloodMeter() {
  const { playSound } = useStore();
  const [level, setLevel] = useState(50);
  const [pumped, setPumped] = useState(false);

  const tier = useMemo(
    () => BLOOD_LEVELS.find((t) => level <= t.max) || BLOOD_LEVELS[BLOOD_LEVELS.length - 1],
    [level]
  );
  const rec = findItem(tier.rec);

  const pulse = () => {
    setPumped(true);
    playSound("drop");
    try {
      confetti({ particleCount: 35, spread: 65, origin: { y: 0.7 } });
    } catch {
      /* ignore */
    }
    setTimeout(() => setPumped(false), 900);
  };

  return (
    <section id="blood" className="py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          kicker="برگرسنج گایز"
          title={
            <>
              امروز <span className="hl hl-ink">برگر خونت</span> چقدر پایینه؟
            </>
          }
          sub="اسلایدر رو بکش تا بگم چی حالتو جا میاره"
        />

        <div className="pop-card p-6 sm:p-9">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* heart gauge */}
            <div className="relative flex flex-col items-center shrink-0">
              <button
                onClick={pulse}
                aria-label="تپش قلب"
                className={`relative ${pumped ? "heartbeat" : ""}`}
              >
                <svg viewBox="0 0 100 100" width="130" height="130" style={{ direction: "ltr" }}>
                  <defs>
                    <clipPath id="heartClip">
                      <path d="M50 88 C20 66 6 48 6 32 C6 18 16 8 30 8 C40 8 47 14 50 22 C53 14 60 8 70 8 C84 8 94 18 94 32 C94 48 80 66 50 88 Z" />
                    </clipPath>
                  </defs>
                  <path
                    d="M50 88 C20 66 6 48 6 32 C6 18 16 8 30 8 C40 8 47 14 50 22 C53 14 60 8 70 8 C84 8 94 18 94 32 C94 48 80 66 50 88 Z"
                    fill="none"
                    stroke="var(--red)"
                    strokeWidth="5"
                  />
                  <rect
                    x="0"
                    y={100 - level}
                    width="100"
                    height={level}
                    fill="var(--red)"
                    clipPath="url(#heartClip)"
                    style={{ transition: "y 0.2s ease, height 0.2s ease" }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-black text-2xl text-white mix-blend-difference">
                  {faNum(level)}٪
                </span>
              </button>
              <span className="mt-2 text-sm font-bold t-red">{tier.label}</span>
            </div>

            {/* slider + rec */}
            <div className="flex-1 w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full accent-[var(--red)] cursor-pointer"
                dir="ltr"
                aria-label="درجه گرسنگی"
              />
              <div className="flex justify-between text-xs t-soft mt-1" dir="ltr">
                <span>سیر 🍃</span>
                <span>گرسنه 🍔</span>
                <span>وضعیت قرمز 🩸</span>
              </div>

              {rec && (
                <div className="mt-5 flex items-center gap-4 bg-[var(--bg-2)] rounded-2xl p-4 brd">
                  <div className="shrink-0">
                    <ItemArt item={rec} size={72} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold t-red mb-1 block">دکتر گایز تجویز می‌کنه:</span>
                    <span className="font-black font-menu t-ink text-lg">{rec.name}</span>
                    <span className="mr-2 text-sm font-black font-menu t-red">{priceLabel(rec.price)}</span>
                    <p className="text-sm t-soft mt-1 leading-6">{tier.copy}</p>
                  </div>
                  <a
                    href="#menu"
                    className="btn-primary rounded-xl px-4 py-2.5 font-extrabold text-sm flex items-center gap-1.5 shrink-0"
                    onClick={() => playSound("pop")}
                  >
                    <ShoppingBag size={16} />
                    بردار
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
