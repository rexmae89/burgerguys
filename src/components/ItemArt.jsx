/* آیکون و شکل بصری هر آیتم منو — SVG داخلی بدون تصویر خارجی */

function BurgerArt({ item, size = 96, className = "" }) {
  const { extra, sauce, patty } = item.art;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} style={{ direction: "ltr" }}>
      {/* bun top */}
      <ellipse cx="60" cy="38" rx="42" ry="26" fill="#E8A94F" />
      <ellipse cx="60" cy="30" rx="40" ry="18" fill="#F3C274" />
      <circle cx="44" cy="26" r="2.4" fill="#FFF3D6" />
      <circle cx="62" cy="22" r="2.4" fill="#FFF3D6" />
      <circle cx="78" cy="28" r="2.4" fill="#FFF3D6" />
      {/* lettuce */}
      <path d="M18 55 Q30 48 42 55 T66 55 T90 55 T102 55 L98 62 L22 62 Z" fill="#6CC24A" />
      {/* tomato */}
      <rect x="30" y="62" width="60" height="7" rx="3.5" fill="#E5192D" />
      {/* cheese drip */}
      <path d="M26 70 L94 70 L94 74 Q88 84 80 74 Q74 86 64 74 Q58 82 50 74 Q42 86 34 74 L26 74 Z" fill="#FFB800" />
      {/* patty */}
      <ellipse cx="60" cy="86" rx="40" ry="11" fill="#5A2F18" />
      <ellipse cx="60" cy="83" rx="36" ry="8" fill="#6E3B21" />
      {/* bun bottom */}
      <path d="M20 98 Q60 88 100 98 Q100 110 60 110 Q20 110 20 98 Z" fill="#E8A94F" />
      {sauce && <path d="M34 92 Q60 86 86 92" stroke={sauce} strokeWidth="4" fill="none" strokeLinecap="round" />}
      {extra === "bacon" && (
        <g stroke="#B4551F" strokeWidth="3" strokeLinecap="round">
          <path d="M32 76 L88 76" strokeDasharray="8 4" />
          <path d="M36 80 L84 80" strokeDasharray="6 5" />
        </g>
      )}
      {extra === "mushroom" && (
        <g fill="#C9A87C">
          <circle cx="42" cy="72" r="4" />
          <circle cx="72" cy="74" r="4.5" />
          <circle cx="58" cy="70" r="3.5" />
        </g>
      )}
      {extra === "chili" && (
        <g fill="#FF7A3C">
          <path d="M40 66 q6 -8 12 -2 q-6 2 -12 2" />
          <path d="M70 68 q6 -8 12 -2 q-6 2 -12 2" />
        </g>
      )}
      {patty === "chicken" && (
        <ellipse cx="60" cy="86" rx="40" ry="11" fill="#E9B44C" />
      )}
    </svg>
  );
}

function FriesArt({ item, size = 96, className = "" }) {
  const { extra } = item.art;
  const boxFill = "#E5192D";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} style={{ direction: "ltr" }}>
      {/* fries */}
      <g>
        <rect x="40" y="18" width="9" height="60" rx="4" fill="#FFD76E" transform="rotate(-8 44 48)" />
        <rect x="55" y="12" width="9" height="66" rx="4" fill="#FFDD87" />
        <rect x="70" y="16" width="9" height="62" rx="4" fill="#FFD76E" transform="rotate(7 74 47)" />
        <rect x="48" y="26" width="9" height="52" rx="4" fill="#F3C862" transform="rotate(3 52 52)" />
        <rect x="62" y="24" width="9" height="54" rx="4" fill="#F3C862" transform="rotate(-4 66 51)" />
      </g>
      {/* box */}
      <path d="M30 60 L90 60 L96 108 L24 108 Z" fill={boxFill} stroke="#142850" strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 60 L90 60 L91.5 72 L28.5 72 Z" fill="#C1121F" />
      <text x="60" y="94" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FFF9F2" fontFamily="Vazirmatn">GUYS</text>
      {extra === "cheese" && <path d="M40 58 Q60 44 80 58 L76 60 L44 60 Z" fill="#FFB800" />}
      {extra === "bacon" && (
        <g stroke="#B4551F" strokeWidth="4" strokeLinecap="round">
          <path d="M38 54 L74 46" strokeDasharray="10 5" />
          <path d="M48 56 L86 50" strokeDasharray="8 6" />
        </g>
      )}
      {extra === "chicken" && (
        <g fill="#E9B44C">
          <circle cx="40" cy="52" r="6" />
          <circle cx="82" cy="54" r="6" />
          <circle cx="60" cy="46" r="7" />
          <circle cx="60" cy="46" r="3" fill="#C98F2E" />
        </g>
      )}
    </svg>
  );
}

function ShakeArt({ item, size = 96, className = "" }) {
  const { flavor } = item.art;
  const liquid = flavor === "choco" ? "#6E3B21" : "#FFF3D6";
  const drip = flavor === "choco" ? "#4E2A15" : "#F5E6C4";
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} style={{ direction: "ltr" }}>
      {/* straw */}
      <rect x="66" y="6" width="7" height="34" rx="3.5" fill="#E5192D" transform="rotate(12 69 23)" />
      {/* whipped cream */}
      <path d="M42 44 Q46 26 60 30 Q74 26 78 44 Q72 52 60 50 Q48 52 42 44 Z" fill="#FFF9F2" stroke="#E9DCC3" strokeWidth="2" />
      {/* cherry */}
      <circle cx="60" cy="24" r="5" fill="#E5192D" />
      <path d="M60 20 Q62 14 68 14" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* cup */}
      <path d="M38 50 L82 50 L76 108 L44 108 Z" fill={liquid} stroke="#142850" strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 58 L80 58 L79.5 62 L40.5 62 Z" fill={drip} />
      {/* glass shine */}
      <path d="M46 62 L49 100" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
      {flavor === "choco" && (
        <g fill="#3B1F0E">
          <circle cx="54" cy="42" r="2.5" />
          <circle cx="64" cy="38" r="2.5" />
          <circle cx="60" cy="46" r="2.5" />
        </g>
      )}
    </svg>
  );
}

export default function ItemArt({ item, size = 96, className = "" }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        width={size}
        height={size}
        className={`object-contain transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] select-none ${className}`}
        loading="lazy"
        draggable={false}
      />
    );
  }
  const kind = item.art.kind;
  if (kind === "fries") return <FriesArt item={item} size={size} className={className} />;
  if (kind === "shake") return <ShakeArt item={item} size={size} className={className} />;
  return <BurgerArt item={item} size={size} className={className} />;
}
