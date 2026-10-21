import { MapPin, Phone, Instagram, Clock, Navigation } from "lucide-react";
import { BRAND, faNum } from "../data/menuData.js";
import { useStore } from "../context/StoreContext.jsx";
import SectionTitle from "./SectionTitle.jsx";

export default function ContactSection() {
  const { isOpen } = useStore();

  return (
    <section id="contact" className="py-16 px-4 relative overflow-hidden">
      {/* matrix-style backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, color-mix(in srgb, var(--red) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        <SectionTitle
          kicker={isOpen ? "اکنون آماده پذیرایی" : "فعلاً بسته‌ایم"}
          title={
            <>
              گایز کجاست؟ <span className="hl hl-ink">بیا پیشمون!</span>
            </>
          }
        />

        <div className="pop-card p-7 sm:p-10 text-center">
          {/* address */}
          <div className="flex flex-col items-center gap-2 mb-7">
            <span className="w-14 h-14 rounded-2xl bg-[var(--red)] text-white flex items-center justify-center neon">
              <MapPin size={26} />
            </span>
            <p className="font-black t-ink text-lg leading-8 max-w-sm mt-2">{BRAND.address}</p>
          </div>

          {/* hours */}
          <div className="inline-flex items-center gap-2 chip rounded-full px-5 py-2.5 font-bold text-sm mb-7">
            <Clock size={16} className="t-red" />
            هر روز ساعت {faNum(BRAND.hours.open)} الی {faNum(24)}
          </div>

          {/* actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${BRAND.phone}`}
              className="btn-primary rounded-2xl px-6 py-3.5 font-extrabold flex items-center gap-2"
              dir="ltr"
            >
              <Phone size={18} />
              {faNum(BRAND.phone)}
            </a>

            <a
              href="https://instagram.com/burgerguys.ir"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost rounded-2xl px-6 py-3.5 font-extrabold flex items-center gap-2"
            >
              <Instagram size={18} />
              burgerguys.ir
            </a>

            {/* map links */}
            <div className="flex gap-2 w-full sm:w-auto justify-center mt-1 sm:mt-0">
              <a
                href="https://balad.ir/search?query=برگر گایز اردبیل"
                target="_blank"
                rel="noreferrer"
                className="chip rounded-2xl px-5 py-3.5 font-extrabold flex items-center gap-2 text-sm"
              >
                <Navigation size={16} className="t-red" />
                مسیریابی بلد
              </a>
              <a
                href="https://neshan.org/maps/search/برگر+گایز+اردبیل"
                target="_blank"
                rel="noreferrer"
                className="chip rounded-2xl px-5 py-3.5 font-extrabold flex items-center gap-2 text-sm"
              >
                <Navigation size={16} className="t-red" />
                نشان
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
