import { useMemo } from "react";

const GLYPHS = "برگرگایز۰۱۲۳۴۵۶۷۸۹";

export default function MatrixRain({ cols = 16 }) {
  const columns = useMemo(
    () =>
      Array.from({ length: cols }, (_, i) => ({
        left: (i / cols) * 100 + Math.random() * 4,
        duration: 5 + Math.random() * 7,
        delay: -Math.random() * 10,
        text: Array.from({ length: 26 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("\n"),
      })),
    [cols]
  );

  return (
    <div className="matrix-rain" aria-hidden="true">
      {columns.map((c, i) => (
        <span
          key={i}
          className="rain-col"
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {c.text}
        </span>
      ))}
    </div>
  );
}
