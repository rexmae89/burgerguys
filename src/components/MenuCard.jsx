import { useRef, useState } from "react";
import { Plus, ChevronLeft } from "lucide-react";
import { priceLabel } from "../data/menuData.js";
import { useStore } from "../context/StoreContext.jsx";
import ItemArt from "./ItemArt.jsx";

const BADGE_STYLE = {
  signature: "sticker",
  hot: "bg-[var(--red)] text-white rotate-[3deg]",
  spicy: "bg-[#142850] text-[#7DD6FF] rotate-[-3deg]",
};

export default function MenuCard({ item, onOpen }) {
  const { addToTray, playSound } = useStore();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [flying, setFlying] = useState(false);
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 10, y: px * 10 });
  };

  const quickAdd = (e) => {
    e.stopPropagation();
    addToTray(item.id);
    playSound("pop");
    setFlying(true);
    setTimeout(() => setFlying(false), 700);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onOpen}
      className="pop-card p-4 sm:p-5 cursor-pointer relative select-none"
      style={{
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.35s ease" : "none",
      }}
    >
      {/* badge */}
      {item.badge && (
        <span
          className={`absolute -top-2.5 right-3 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-black z-10 ${
            BADGE_STYLE[item.badge.type] || "sticker"
          }`}
        >
          {item.badge.label}
        </span>
      )}

      {/* art */}
      <div
        className={`flex justify-center my-2 ${flying ? "fly-tray" : ""}`}
        style={{ "--fx": "-40vw", "--fy": "-60vh" }}
      >
        <ItemArt item={item} size={92} />
      </div>

      {/* name */}
      <h3 className="font-black font-menu t-ink text-sm sm:text-base text-center leading-6">{item.name}</h3>

      {/* ingredient chips */}
      <div className="flex flex-wrap justify-center gap-1 mt-2.5 min-h-[22px]">
        {item.ingredients.slice(0, 3).map((ing, i) => (
          <span key={i} className="text-[10px] sm:text-[11px] t-soft chip rounded-full px-2 py-0.5 font-bold">
            {ing}
          </span>
        ))}
      </div>

      {/* price */}
      <div className="text-center mt-3">
        <p className="font-black font-menu t-red text-sm sm:text-base leading-tight">{priceLabel(item.price)}</p>
        {item.doublePrice ? (
          <p className="text-[11px] font-bold t-soft mt-0.5 font-menu">
            دبل: <span className="t-ink font-black">{priceLabel(item.doublePrice)}</span>
          </p>
        ) : (
          <p className="text-[11px] font-bold opacity-0 mt-0.5 select-none" aria-hidden="true">
            &nbsp;
          </p>
        )}
      </div>

      {/* actions */}
      <div className="flex items-center justify-between mt-3 gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="text-xs font-extrabold t-red flex items-center gap-0.5 hover:gap-1.5 transition-all"
        >
          جزییات
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={quickAdd}
          className="btn-primary rounded-xl w-9 h-9 flex items-center justify-center shrink-0"
          aria-label={`افزودن ${item.name} به سینی`}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}
