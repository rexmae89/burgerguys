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
                className={`relative group cursor-pointer select-none transition-transform duration-300 hover:scale-105 ${
                  pumped ? "heartbeat" : ""
                }`}
              >
                <div className="relative w-[130px] sm:w-[145px] aspect-[550/478]">
                  {/* Empty/starving heart base (dim & desaturated) */}
                  <img
                    src="/heart-meter.png"
                    alt="برگرسنج گایز"
                    width={145}
                    height={126}
                    className="w-full h-full object-contain filter grayscale-[80%] brightness-50 opacity-40 select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Filled vibrant heart (liquid fill level from bottom to top) */}
                  <div
                    className="absolute inset-0 overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      clipPath: `inset(${100 - level}% 0 0 0)`,
                    }}
                  >
                    <img
                      src="/heart-meter.png"
                      alt=""
                      width={145}
                      height={126}
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(229,25,45,0.45)] select-none pointer-events-none"
                      draggable={false}
                    />
                  </div>

                  {/* Percentage badge */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="sticker px-2.5 py-0.5 rounded-lg font-black text-base sm:text-lg shadow-md border border-[var(--bg)] pointer-events-none">
                      {faNum(level)}٪
                    </span>
                  </span>
                </div>
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
