import { useMemo, useState } from "react";
import { X, Plus, Minus, Trash2, MessageCircle, Copy, ShoppingBag, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { BRAND, faNum, priceLabel } from "../data/menuData.js";
import { useStore } from "../context/StoreContext.jsx";
import ItemArt from "./ItemArt.jsx";

function buildOrderText(lines, total, table) {
  let text = "🍔 سفارش — برگر گایز\n";
  if (table) text += `میز شماره ${faNum(table)}\n`;
  text += "\n";
  lines.forEach((l, i) => {
    const linePrice = (l.item.price || 0) * l.qty;
    text += `${faNum(i + 1)}) ${l.item.name} × ${faNum(l.qty)} — ${priceLabel(linePrice)}\n`;
  });
  text += `\nجمع: ${priceLabel(total)}\n\nممنون 🙏`;
  return text;
}

export default function OrderTray({ open, onClose }) {
  const { trayLines, trayTotal, changeQty, removeFromTray, clearTray, playSound } = useStore();
  const [copied, setCopied] = useState(false);
  const [table, setTable] = useState("");

  const orderText = useMemo(() => buildOrderText(trayLines, trayTotal, table), [trayLines, trayTotal, table]);
  const whatsappUrl = `https://wa.me/${BRAND.phoneIntl}?text=${encodeURIComponent(orderText)}`;

  if (!open) return null;

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      playSound("pop");
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 } });
      } catch {
        /* ignore */
      }
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard denied */
    }
  };

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="absolute bottom-0 inset-x-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:inset-x-auto sm:left-6 sm:w-[420px] bg-[var(--card)] rounded-t-3xl sm:rounded-3xl border-2 border-[var(--ink)] shadow-2xl pop-in max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="سینی سفارش"
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b-[1.5px] border-[var(--line)]">
          <h3 className="font-black text-lg t-ink flex items-center gap-2">
            <ShoppingBag size={20} className="t-red" />
            سینی سفارش من
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full brd flex items-center justify-center hover:bg-[var(--red)] hover:text-white transition-colors"
            aria-label="بستن سینی"
          >
            <X size={18} />
          </button>
        </div>

        {/* lines */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {trayLines.length === 0 && (
            <div className="text-center py-12">
              <span className="text-5xl block mb-3">🛒</span>
              <p className="font-black t-ink">سینیت خالیه!</p>
              <p className="t-soft text-sm mt-1">از منو یه چیزی بنداز توش.</p>
            </div>
          )}

          {trayLines.map((l) => (
            <div key={l.id} className="flex items-center gap-3 bg-[var(--bg-2)] rounded-2xl p-3 brd">
              <div className="shrink-0">
                <ItemArt item={l.item} size={52} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black font-menu t-ink text-sm truncate">{l.item.name}</p>
                <p className="text-[11px] font-bold font-menu t-red mt-0.5">{priceLabel(l.item.price)}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={() => {
                      changeQty(l.id, -1);
                      playSound("drop");
                    }}
                    className="w-7 h-7 rounded-lg brd bg-[var(--card)] flex items-center justify-center"
                    aria-label="کم کردن"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-black text-sm w-6 text-center">{faNum(l.qty)}</span>
                  <button
                    onClick={() => {
                      changeQty(l.id, 1);
                      playSound("pop");
                    }}
                    className="w-7 h-7 rounded-lg brd bg-[var(--card)] flex items-center justify-center"
                    aria-label="اضافه کردن"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  removeFromTray(l.id);
                  playSound("drop");
                }}
                className="t-soft hover:t-red shrink-0"
                aria-label="حذف"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>

        {/* footer actions */}
        {trayLines.length > 0 && (
          <div className="px-5 py-4 border-t-[1.5px] border-[var(--line)] space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="t-soft font-bold">تعداد کل آیتم‌ها:</span>
              <span className="font-black t-ink">{faNum(trayLines.reduce((s, l) => s + l.qty, 0))}</span>
            </div>

            {/* table number */}
            <div className="flex items-center gap-2.5">
              <label htmlFor="table-no" className="t-soft font-bold text-xs shrink-0">شماره میز (اختیاری):</label>
              <input
                id="table-no"
                inputMode="numeric"
                value={table}
                onChange={(e) => setTable(e.target.value.replace(/\D/g, "").slice(0, 3))}
                placeholder="مثلاً ۷"
                className="flex-1 rounded-xl brd bg-[var(--card)] px-3 py-2 text-sm font-black t-ink outline-none focus:border-[var(--red)] transition-colors text-center"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="t-soft font-bold text-sm">جمع سفارش:</span>
              <span className="font-black t-red text-lg">{priceLabel(trayTotal)}</span>
            </div>

            <div className="flex gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary rounded-2xl px-4 py-3 font-extrabold flex-1 flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={17} />
                سفارش با واتساپ
              </a>
              <button
                onClick={copyText}
                className="btn-ghost rounded-2xl px-4 py-3 font-extrabold flex items-center gap-2 text-sm"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? "کپی شد!" : "کپی سفارش"}
              </button>
            </div>

            <p className="text-[11px] t-soft text-center leading-5">
              سفارش رو به گارسون نشون بده یا با واتساپ بفرست — بدون ثبت‌نام و دردسر.
            </p>

            <button
              onClick={() => {
                clearTray();
                playSound("drop");
              }}
              className="w-full text-xs font-bold t-soft hover:t-red pt-1"
            >
              خالی کردن سینی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
