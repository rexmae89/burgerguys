import { Beef, Flame, UtensilsCrossed } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";

const FACTS = [
  {
    icon: <Beef size={26} />,
    title: "بیف ۱۵۰ گرمی دست‌ساز",
    text: "گوشت تازه رو دست خودمون چرخ و فرم می‌کنیم — فریزری در کار نیست.",
  },
  {
    icon: <Flame size={26} />,
    title: "روی آتش واقعی",
    text: "هر برگر جلوی چشمتون کبابی می‌شه، نه تو فرزین.",
  },
  {
    icon: <UtensilsCrossed size={26} />,
    title: "سس گایزِ راز",
    text: "فرمولش فقط پیش ماست — همونه که برگر خون رو می‌بره بالا.",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          kicker="داستان گایز"
          title={
            <>
              برگر ما <span className="hl hl-ink">قصه‌ساز</span> نیست، طعمه
            </>
          }
          sub="اردبیل، خیابان شهید سید فاطمی — هر روز ۱۲ تا ۲۴"
        />

        <div className="grid sm:grid-cols-3 gap-5">
          {FACTS.map((f, i) => (
            <div
              key={i}
              className="pop-card p-6 text-center"
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              <span className="w-14 h-14 mx-auto rounded-2xl bg-[var(--red)] text-white flex items-center justify-center mb-4 neon">
                {f.icon}
              </span>
              <h3 className="font-black t-ink text-base mb-2">{f.title}</h3>
              <p className="text-sm t-soft leading-7">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
