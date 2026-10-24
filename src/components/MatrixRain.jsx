import { useMemo } from "react";

const BURGERS = [
  "/items/burger-classic.png",
  "/items/burger-double-cheese.png",
  "/items/burger-bacon-mushroom.png",
  "/items/burger-spicy-chili.png",
];

export default function MatrixRain({ count = 22 }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const src = BURGERS[i % BURGERS.length];
        const left = (i / count) * 96 + (Math.random() * 4 - 2);
        const size = Math.floor(26 + Math.random() * 22); // 26px to 48px
        const duration = 7 + Math.random() * 8; // 7s to 15s
        const delay = -Math.random() * 15; // pre-filled on screen
        const opacity = 0.14 + Math.random() * 0.14; // subtle watermark feel
        const rotate = Math.floor(Math.random() * 360);
        const spinDuration = 10 + Math.random() * 12;

        return { id: i, src, left, size, duration, delay, opacity, rotate, spinDuration };
      }),
    [count]
  );

  return (
    <div className="matrix-rain" aria-hidden="true">
      {drops.map((d) => (
        <div
          key={d.id}
          className="burger-rain-drop"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        >
          <img
            src={d.src}
            alt=""
            width={d.size}
            height={d.size}
            className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(255,42,59,0.35)]"
            style={{
              transform: `rotate(${d.rotate}deg)`,
              animation: `burger-spin ${d.spinDuration}s linear infinite`,
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
