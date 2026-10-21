import { useState, useRef } from "react";
import { ArrowDown, Flame, Volume2, VolumeX } from "lucide-react";
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

function HeroBurgerVideo({ matrix = false }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative flex items-center justify-center my-4 md:my-0 select-none">
      {/* subtle ambient warmth behind burger */}
      <div
        className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-gradient-to-tr from-[var(--red)] via-[#FF7A3C] to-[var(--yellow)] opacity-20 blur-3xl pointer-events-none"
        aria-hidden
      />

      {/* transparent video floating directly without portal/border */}
      <div className="relative w-[300px] sm:w-[380px] lg:w-[450px] aspect-square flex items-center justify-center">
        <video
          ref={videoRef}
          src="/hero-burger-transparent.webm"
          poster="/hero-burger-transparent-poster.png"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={toggleSound}
          title={isMuted ? "برای شنیدن صدای برگر کلیک کن" : "قطع صدا"}
        />

        {/* sound toggle chip */}
        <button
          type="button"
          onClick={toggleSound}
          className="chip absolute top-2 left-2 z-20 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold shadow-lg backdrop-blur-md transition-all hover:scale-105"
          aria-label={isMuted ? "وصل صدای برگر" : "قطع صدا"}
          title={isMuted ? "وصل صدای برگر" : "قطع صدا"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="t-red animate-pulse" />}
          <span className="hidden sm:inline">{isMuted ? "صدا" : "پخش صدا"}</span>
        </button>

        {/* Floating Badge */}
        <span className="sticker px-3.5 py-1.5 text-xs sm:text-sm font-black rotate-[-6deg] absolute -bottom-2 sm:bottom-1 right-2 sm:right-6 z-10 shadow-xl border-2 border-[var(--bg)] pointer-events-none">
          🔥 طعمی خارج از ماتریکس
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const { theme } = useStore();
  const matrix = theme === "matrix";

  return (
    <section id="top" className="relative overflow-hidden bg-dots pt-[92px] pb-10">
      {/* stickers */}
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

      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          {/* copy */}
          <div className="text-center md:text-right flex-1">
            <span className="inline-block sticker font-black px-4 py-1.5 rounded-xl text-sm mb-5">
              🍔 We Serve Burgers & More
            </span>
            <h1
              className={`font-black leading-[1.15] text-4xl sm:text-5xl lg:text-6xl t-ink ${matrix ? "text-glow" : ""}`}
            >
              اگه روبراه نیستی
              <br />
              شاید <span className="t-red">برگر خونت</span> پایینه
              <span className="t-red"> 🩸</span>
            </h1>
            <p className="mt-4 t-soft text-base sm:text-lg max-w-md mx-auto md:mx-0 md:ml-auto leading-8">
              برگر گایز اردبیل — حال‌وهوایی که از ماتریکس زده بیرون. از ساعت ۱۲ تا ۲۴ منتظرتونیم!
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a href="#menu" className="btn-primary rounded-2xl px-6 py-3.5 font-extrabold flex items-center gap-2 text-base">
                <Flame size={20} />
                سفارش بده!
              </a>
              <a href="#blood" className="btn-ghost rounded-2xl px-6 py-3.5 font-extrabold text-base">
                برگر خونم چقدره؟ 🩸
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-5 sm:gap-6 text-sm font-bold t-soft">
              <span className="flex flex-col items-center md:items-start">
                <span className="text-xl t-ink font-black">۱۰+</span>
                <span>برگر امضادار</span>
              </span>
              <span className="w-px h-8 bg-[var(--line)]" />
              <span className="flex flex-col items-center md:items-start">
                <span className="text-xl t-ink font-black">۱۲ تا ۲۴</span>
                <span>هر روز باز</span>
              </span>
              <span className="w-px h-8 bg-[var(--line)]" />
              <span className="flex flex-col items-center md:items-start">
                <span className="text-xl t-ink font-black">۱۵۰ گرم</span>
                <span>بیف دست‌ساز</span>
              </span>
            </div>
          </div>

          {/* video mascot */}
          <div className="pop-in">
            <HeroBurgerVideo matrix={matrix} />
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
