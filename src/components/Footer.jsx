import { Instagram, Phone, MapPin } from "lucide-react";
import { BRAND, faNum } from "../data/menuData.js";

export default function Footer() {
  return (
    <footer className="pt-10 pb-24 sm:pb-10 px-4 border-t-[1.5px] border-[var(--line)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* logo */}
        <div className="flex items-center gap-3">
          <span className="w-12 h-12 rounded-full overflow-hidden">
            <img src="/logo.png" alt="برگر گایز" className="w-full h-full object-cover" />
          </span>
          <div>
            <p className="font-black t-ink text-base leading-tight">
              برگر <span className="t-red">گایز</span>
            </p>
            <p className="text-[10px] t-soft">A TASTE OUT OF MATRIX</p>
          </div>
        </div>

        {/* links */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${BRAND.phone}`}
            className="chip rounded-full w-11 h-11 flex items-center justify-center"
            aria-label="تماس"
          >
            <Phone size={19} />
          </a>
          <a
            href="https://instagram.com/burgerguys.ir"
            target="_blank"
            rel="noreferrer"
            className="chip rounded-full w-11 h-11 flex items-center justify-center"
            aria-label="اینستاگرام"
          >
            <Instagram size={19} />
          </a>
          <a
            href="https://balad.ir/search?query=برگر گایز اردبیل"
            target="_blank"
            rel="noreferrer"
            className="chip rounded-full w-11 h-11 flex items-center justify-center"
            aria-label="مسیریابی"
          >
            <MapPin size={19} />
          </a>
        </div>
      </div>

      <p className="text-center text-xs t-soft mt-8 font-bold">
        © {faNum(1404)} برگر گایز اردبیل — ساخته‌شده با 🍔 و عشق
      </p>
    </footer>
  );
}
