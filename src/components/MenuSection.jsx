import { AlertTriangle, Search, X } from "lucide-react";
import { MENU, MOODS, MOOD_EMOJI, faNum } from "../data/menuData.js";
import { useStore } from "../context/StoreContext.jsx";
import MenuCard from "./MenuCard.jsx";
import SectionTitle from "./SectionTitle.jsx";

export default function MenuSection({ onOpenItem }) {
  const { category, setCategory, mood, setMood, query, setQuery, filteredItems } = useStore();

  return (
    <section id="menu" className="py-14 px-4 bg-dots">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title={
            <>
              چی <span className="hl hl-ink">هوس</span> کردی؟
            </>
          }
          sub="منوی کامل گایز — هر برگر با فرایز و سس گایز سرو می‌شه"
        />

        {/* search */}
        <div className="max-w-md mx-auto relative mb-6">
          <Search size={18} className="absolute top-1/2 right-4 -translate-y-1/2 t-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو کن... (مثلاً پنیر، تند، بیکن)"
            className="w-full rounded-2xl brd bg-[var(--card)] px-11 py-3.5 text-sm font-bold t-ink outline-none focus:border-[var(--red)] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute top-1/2 left-4 -translate-y-1/2 t-soft hover:t-red"
              aria-label="پاک کردن جستجو"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* category tabs */}
        <div className="flex justify-center gap-2.5 mb-5 flex-wrap">
          {Object.values(MENU).map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`chip rounded-full px-6 py-2.5 font-black text-sm ${
                category === c.id ? "chip-active" : ""
              }`}
            >
              {c.label}
              <span className="mr-2 text-xs opacity-70">({faNum(c.items.length)})</span>
            </button>
          ))}
        </div>

        {/* mood filters */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {Object.entries(MOODS).map(([key, m]) => (
            <button
              key={key}
              onClick={() => setMood(mood === key ? null : key)}
              className={`chip rounded-full px-3.5 py-2 font-bold text-xs sm:text-sm ${
                mood === key ? "chip-active" : ""
              }`}
            >
              <span className="ml-1">{MOOD_EMOJI[key]}</span>
              {m.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onOpen={() => onOpenItem(item)} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <span className="text-5xl block mb-3">🍔❓</span>
            <p className="font-black t-ink text-lg">چیزی پیدا نشد!</p>
            <p className="t-soft text-sm mt-1">فیلترها رو عوض کن یا دنبال یه چیز دیگه بگرد.</p>
          </div>
        )}

        {/* allergen warning */}
        <div className="max-w-2xl mx-auto mt-12 pop-card p-5 flex items-start gap-3">
          <AlertTriangle size={22} className="t-red shrink-0 mt-0.5" />
          <p className="text-sm font-bold t-ink leading-7">
            در صورت داشتن حساسیت به هرگونه مواد غذایی، قبل از سفارش به ما اطلاع دهید.
          </p>
        </div>
      </div>
    </section>
  );
}
