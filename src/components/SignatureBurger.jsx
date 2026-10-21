import { useState } from "react";
import { Sparkles } from "lucide-react";
import { SIGNATURE_LAYERS, MENU, faNum, priceLabel } from "../data/menuData.js";
import { useStore } from "../context/StoreContext.jsx";
import SectionTitle from "./SectionTitle.jsx";

/* لایه‌های گایز برگر به صورت CSS — کالبدشکافی تعاملی */
const LAYER_STYLE = {
  "l-bun-top": (
    <div className="w-56 h-16 art-bun-top relative">
      <span className="absolute top-2 right-8 w-2.5 h-2.5 rounded-full bg-[#FFF3D6]" />
      <span className="absolute top-3 left-10 w-2.5 h-2.5 rounded-full bg-[#FFF3D6]" />
      <span className="absolute top-5 right-20 w-2 h-2 rounded-full bg-[#FFF3D6]" />
    </div>
  ),
  "l-sauce": (
    <div
      className="w-44 h-5 rounded-full"
      style={{ background: "linear-gradient(#E5192D, #C1121F)" }}
    />
  ),
  "l-relish": (
    <div className="w-40 h-4 rounded-full" style={{ background: "linear-gradient(#7FB95A, #5E9B3E)" }} />
  ),
  "l-lettuce": <div className="w-52 h-7 art-lettuce" />,
  "l-beef": (
    <div className="w-52 h-10 art-patty relative">
      <span className="absolute inset-x-4 top-2 h-1 rounded bg-[#7A4426]" />
    </div>
  ),
  "l-smoke": (
    <div
      className="w-44 h-7 rounded-lg"
      style={{
        background:
          "repeating-linear-gradient(100deg,#8a4a22 0 12px,#6E3B1F 12px 18px,#C98F5A 18px 22px)",
      }}
    />
  ),
  "l-onion": (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-9 h-9 rounded-full border-[3px] border-[#C77FD8] bg-[#E5B8F0]/60" />
      ))}
    </div>
  ),
  "l-cheese": <div className="w-48 h-6 art-cheese" />,
  "l-bun-bottom": <div className="w-52 h-8 art-bun-bottom" />,
};

export default function SignatureBurger() {
  const { playSound, addToTray } = useStore();
  const [exploded, setExploded] = useState(false);
  const [active, setActive] = useState(null);

  const toggle = () => {
    setExploded((e) => !e);
    playSound("drop");
  };

  return (
    <section id="signature" className="py-14 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          kicker="کالبدشکافی امضا"
          title={
            <>
              گایز برگر رو <span className="hl hl-ink">تکه‌تکه</span> ببین!
            </>
          }
          sub="روی دکمه بزن تا لایه‌های برگر از هم باز بشن"
        />

        <div className="pop-card p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* burger explode stage */}
            <div className="relative flex flex-col items-center justify-center shrink-0">
              <div
                className={`relative flex flex-col items-center justify-center gap-0.5 transition-all duration-500 ${
                  exploded ? "exploded" : ""
                }`}
                style={{ "--gap": exploded ? "46px" : "0px", minHeight: exploded ? 380 : 190 }}
              >
                {SIGNATURE_LAYERS.map((L, i) => (
                  <div
                    key={L.cls}
                    className={`burger-layer ${L.cls} ${active === i ? "lit" : ""} ${
                      exploded ? "opacity-100" : ""
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => {
                      setActive(i);
                      playSound("pop");
                    }}
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {LAYER_STYLE[L.cls]}
                  </div>
                ))}
              </div>

              <button
                onClick={toggle}
                className="btn-primary rounded-2xl px-6 py-3 font-extrabold mt-6 flex items-center gap-2"
              >
                <Sparkles size={18} />
                {exploded ? "ببندش!" : "کالبدشکافی کن!"}
              </button>
            </div>

            {/* layer list */}
            <div className="flex-1 w-full">
              <h3 className="font-black text-xl t-ink mb-4 flex items-center gap-2">
                <span className="sticker px-3 py-1 rounded-lg text-sm rotate-[-3deg]">۹ لایه</span>
                آناتومی امضای گایز
              </h3>
              <ul className="space-y-2">
                {SIGNATURE_LAYERS.map((L, i) => (
                  <li
                    key={L.cls}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all cursor-pointer ${
                      active === i ? "bg-[var(--bg-2)] scale-[1.02] brd" : ""
                    }`}
                  >
                    <span className="w-7 h-7 rounded-full bg-[var(--red)] text-white text-xs font-black flex items-center justify-center shrink-0">
                      {faNum(i + 1)}
                    </span>
                    <span className="font-bold t-ink text-sm">{L.name}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  addToTray("guys");
                  playSound("pop");
                }}
                className="btn-primary w-full rounded-2xl px-6 py-3.5 font-extrabold mt-5"
              >
                🍔 یه گایز برگر به سینیم اضافه کن — {priceLabel(MENU.burgers.items.find(i => i.id === "guys")?.price || 0)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
