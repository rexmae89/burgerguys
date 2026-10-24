import { ArrowDown, Flame } from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";

const STICKERS = [
  { emoji: "🍔", top: "12%", left: "6%", size: 52, r: "-8deg", d: 0 },
  { emoji: "🍟", top: "64%", left: "3%", size: 46, r: "10deg", d: 1.2 },
  { emoji: "🥓", top: "22%", left: "88%", size: 44, r: "6deg", d: 0.6 },
  { emoji: "🧀", top: "70%", left: "90%", size: 40, r: "-12deg", d: 1.8 },
  { emoji: "🥤", top: "8%", left: "72%", size: 42, r: "4deg", d: 2.4 },
  { emoji: "🌶️", top: "78%", left: "50%", size: 38, r: "-6deg", d: 0.9 },
  { emoji: "⭐", top: "6%", left: "38%", size: 34, r: "8deg", d: 3 },
  { emoji: "🍅", top: "86%", left: "18%", size: 36, r: "-4deg", d: 2.1 },
];

export default function Hero() {
  const { theme } = useStore();
  const matrix = theme === "matrix";

  return (
    <section id="top" className="relative overflow-hidden bg-dots pt-[92px] pb-10">
      {STICKERS.map((s, i) => (
        <span
          key={i}
          className={`floaty absolute select-none pointer-events-none ${matrix ? "opacity-40" : "opacity-90"}`}
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            "--r": s.r,
            animationDelay: `${s.d}s`,
          }}
          aria-hidden
        >
          {s.emoji}
        </span>
      ))}

      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="text-center">
          <span className="inline-block sticker font-black px-4 py-1.5 rounded-xl text-sm mb-5">
            🍔 We Serve Burgers & More
          </span>

          <h1
            className={`font-black leading-[1.15] text-4xl sm:text-5xl lg:text-6xl t-ink max-w-3xl mx-auto ${matrix ? "text-glow" : ""}`}
          >
            اگه روبراه نیستی
            <br />
            شاید <span className="t-red">برگر خونت</span> پایینه
            <span className="t-red"> 🩸</span>
          </h1>

          <p className="mt-4 t-soft text-base sm:text-lg max-w-md mx-auto leading-8">
            برگر گایز اردبیل — حال‌وهوایی که از ماتریکس زده بیرون. از ساعت ۱۲ تا ۲۴ منتظرتونیم!
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="#menu" className="btn-primary rounded-2xl px-6 py-3.5 font-extrabold flex items-center gap-2 text-base">
              <Flame size={20} />
              سفارش بده!
            </a>
            <a href="#blood" className="btn-ghost rounded-2xl px-6 py-3.5 font-extrabold text-base">
              برگر خونم چقدره؟ 🩸
            </a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5 sm:gap-6 text-sm font-bold t-soft">
            <span className="flex flex-col items-center">
              <span className="text-xl t-ink font-black">۱۰+</span>
              <span>برگر امضادار</span>
            </span>
            <span className="w-px h-8 bg-[var(--line)]" />
            <span className="flex flex-col items-center">
              <span className="text-xl t-ink font-black">۱۲ تا ۲۴</span>
              <span>هر روز باز</span>
            </span>
            <span className="w-px h-8 bg-[var(--line)]" />
            <span className="flex flex-col items-center">
              <span className="text-xl t-ink font-black">۱۵۰ گرم</span>
              <span>بیف دست‌ساز</span>
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a href="#blood" className="floaty t-red" aria-label="برو پایین">
            <ArrowDown size={28} />
          </a>
        </div>
      </div>
    </section>
  );
}
