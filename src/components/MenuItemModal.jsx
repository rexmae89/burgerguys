import { useEffect, useState } from "react";
import { X, Plus, Leaf, Flame } from "lucide-react";
import { MOODS, MOOD_EMOJI, priceLabel } from "../data/menuData.js";
import { useStore } from "../context/StoreContext.jsx";
import ItemArt from "./ItemArt.jsx";

export default function MenuItemModal({ item, onClose }) {
  const { addToTray, playSound } = useStore();
  const [isDouble, setIsDouble] = useState(false);
  const open = Boolean(item);

  useEffect(() => {
    setIsDouble(false);
  }, [item?.id]);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!item) return null;

  const currentPrice = isDouble && item.doublePrice ? item.doublePrice : item.price;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-[var(--card)] w-full max-w-lg rounded-t-3xl sm:rounded-3xl border-2 border-[var(--ink)] shadow-2xl pop-in max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* header art */}
        <div className="relative bg-dots flex justify-center pt-6 pb-2">
          <ItemArt item={item} size={150} />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[var(--bg)] brd flex items-center justify-center hover:bg-[var(--red)] hover:text-white transition-colors"
            aria-label="بستن"
          >
            <X size={20} />
          </button>
          {item.badge && (
            <span className="absolute top-4 right-4 sticker px-3 py-1.5 rounded-xl text-xs font-black">
              {item.badge.label}
            </span>
          )}
        </div>

        <div className="p-6 sm:p-7">
          <h3 className="font-black font-menu text-2xl t-ink text-center">{item.name}</h3>
          <p className="text-center font-black font-menu t-red text-xl mt-1.5">{priceLabel(currentPrice)}</p>

          {item.doublePrice && (
            <div className="flex justify-center gap-2 mt-3.5">
              <button
                type="button"
                onClick={() => {
                  setIsDouble(false);
                  playSound("pop");
                }}
                className={`chip rounded-xl px-4 py-1.5 text-xs font-black transition-all ${
                  !isDouble ? "chip-active" : ""
                }`}
              >
                تک بیف — {priceLabel(item.price)}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDouble(true);
                  playSound("pop");
                }}
                className={`chip rounded-xl px-4 py-1.5 text-xs font-black transition-all ${
                  isDouble ? "chip-active" : ""
                }`}
              >
                دبل بیف — {priceLabel(item.doublePrice)}
              </button>
            </div>
          )}

          {/* moods */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-4">
            {item.moods.map((m) => (
              <span key={m} className="chip rounded-full px-3 py-1 text-xs font-bold">
                {MOOD_EMOJI[m]} {MOODS[m]?.label}
              </span>
            ))}
          </div>

          {/* ingredients */}
          <div className="mt-6">
            <h4 className="font-black t-ink text-sm mb-3 flex items-center gap-1.5">
              <Leaf size={15} className="t-red" />
              داخلش چی هست؟
            </h4>
            <ul className="space-y-2">
              {item.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-bold t-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)] shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* note */}
          {item.note && (
            <div className="mt-4 rounded-xl bg-[var(--bg-2)] brd px-4 py-3 flex items-center gap-2">
              <Flame size={15} className="t-red shrink-0" />
              <span className="text-xs font-bold t-ink">{item.note}</span>
            </div>
          )}

          {/* actions */}
          <div className="mt-6 flex gap-2.5">
            <button
              onClick={onClose}
              className="btn-ghost rounded-2xl px-5 py-3 font-extrabold flex-1"
            >
              بستن
            </button>
            <button
              onClick={() => {
                addToTray(isDouble && item.doublePrice ? `${item.id}-double` : item.id);
                playSound("pop");
                onClose();
              }}
              className="btn-primary rounded-2xl px-5 py-3 font-extrabold flex-1 flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              {isDouble ? "بنداز توی سینی (دبل)" : "بنداز توی سینی"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
