import { useStore } from "../context/StoreContext.jsx";

const WORDS = [
  "اگه روبراه نیستی شاید برگر خونت پایینه 🍔🩸",
  "A TASTE OUT OF MATRIX",
  "WE SERVE BURGERS & MORE",
  "بیف ۱۵۰ گرمی دست‌ساز 🔥",
  "سس گایز مخصوص 🤤",
  "هر روز ۱۲ تا ۲۴ ⏰",
];

export default function Marquee() {
  const { theme } = useStore();
  const row = [...WORDS, ...WORDS];

  return (
    <div
      className="overflow-hidden py-3 border-y-[1.5px] border-[var(--line)]"
      style={{
        background: theme === "matrix" ? "var(--bg-2)" : "var(--red)",
      }}
    >
      <div className="marquee-track">
        {row.map((w, i) => (
          <span
            key={i}
            className={`mx-5 font-black text-sm sm:text-base whitespace-nowrap ${
              theme === "matrix" ? "t-red text-glow" : "text-white"
            }`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
