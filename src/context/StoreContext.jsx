import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { MENU, BRAND } from "../data/menuData.js";

const StoreContext = createContext(null);

const ALL_ITEMS = Object.values(MENU).flatMap((c) => c.items);

export function findItem(id) {
  if (typeof id === "string" && id.endsWith("-double")) {
    const baseId = id.replace("-double", "");
    const baseItem = ALL_ITEMS.find((i) => i.id === baseId);
    if (baseItem && baseItem.doublePrice) {
      return {
        ...baseItem,
        id,
        name: `${baseItem.name} (دبل)`,
        price: baseItem.doublePrice,
      };
    }
  }
  return ALL_ITEMS.find((i) => i.id === id) || null;
}

export function StoreProvider({ children }) {
  /* ---------------- Theme ---------------- */
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("bg-theme") || "pop";
    } catch {
      return "pop";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("matrix", theme === "matrix");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "matrix" ? "#0D0E11" : "#FFF9F2");
    try {
      localStorage.setItem("bg-theme", theme);
    } catch {
      /* private mode */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "pop" ? "matrix" : "pop")), []);

  /* ---------------- Tray (cart) ---------------- */
  const [tray, setTray] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bg-tray") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("bg-tray", JSON.stringify(tray));
    } catch {
      /* ignore */
    }
  }, [tray]);

  const addToTray = useCallback((id, qty = 1) => {
    setTray((t) => {
      const found = t.find((r) => r.id === id);
      if (found) return t.map((r) => (r.id === id ? { ...r, qty: r.qty + qty } : r));
      return [...t, { id, qty }];
    });
  }, []);

  const removeFromTray = useCallback((id) => {
    setTray((t) => t.filter((r) => r.id !== id));
  }, []);

  const changeQty = useCallback((id, delta) => {
    setTray((t) =>
      t
        .map((r) => (r.id === id ? { ...r, qty: r.qty + delta } : r))
        .filter((r) => r.qty > 0)
    );
  }, []);

  const clearTray = useCallback(() => setTray([]), []);

  const trayLines = useMemo(
    () =>
      tray
        .map((r) => ({ ...r, item: findItem(r.id) }))
        .filter((r) => r.item),
    [tray]
  );
  const trayCount = useMemo(() => trayLines.reduce((s, r) => s + r.qty, 0), [trayLines]);
  const trayTotal = useMemo(
    () => trayLines.reduce((s, r) => s + (r.item.price || 0) * r.qty, 0),
    [trayLines]
  );

  /* ---------------- Filters ---------------- */
  const [category, setCategory] = useState("burgers");
  const [mood, setMood] = useState(null);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    let items = MENU[category]?.items || [];
    if (mood) items = items.filter((i) => i.moods.includes(mood));
    if (query.trim()) {
      const q = query.trim();
      items = items.filter((i) => i.name.includes(q) || i.ingredients.some((ing) => ing.includes(q)));
    }
    return items;
  }, [category, mood, query]);

  /* ---------------- Live open/closed status (ticks every minute) ---------------- */
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const hour = now.getHours() + now.getMinutes() / 60;
  const isOpen = hour >= BRAND.hours.open && hour < BRAND.hours.close;

  /* ---------------- Sound feedback (Web Audio) ---------------- */
  const [soundOn, setSoundOn] = useState(() => {
    try {
      return localStorage.getItem("bg-sound") !== "off";
    } catch {
      return true;
    }
  });

  const playSound = useCallback(
    (type = "pop") => {
      if (!soundOn) return;
      try {
        const ctx = playSound._ctx || (playSound._ctx = new (window.AudioContext || window.webkitAudioContext)());
        if (ctx.state === "suspended") ctx.resume();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        const t = ctx.currentTime;
        if (type === "pop") {
          o.frequency.setValueAtTime(520, t);
          o.frequency.exponentialRampToValueAtTime(880, t + 0.08);
          g.gain.setValueAtTime(0.12, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
          o.start(t);
          o.stop(t + 0.15);
        } else if (type === "drop") {
          o.frequency.setValueAtTime(300, t);
          o.frequency.exponentialRampToValueAtTime(120, t + 0.16);
          g.gain.setValueAtTime(0.1, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          o.start(t);
          o.stop(t + 0.2);
        } else {
          o.frequency.setValueAtTime(660, t);
          g.gain.setValueAtTime(0.06, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
          o.start(t);
          o.stop(t + 0.11);
        }
      } catch {
        /* audio not available */
      }
    },
    [soundOn]
  );

  const toggleSound = useCallback(() => {
    setSoundOn((s) => {
      const next = !s;
      try {
        localStorage.setItem("bg-sound", next ? "on" : "off");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = {
    theme,
    toggleTheme,
    tray,
    trayLines,
    trayCount,
    trayTotal,
    addToTray,
    removeFromTray,
    changeQty,
    clearTray,
    category,
    setCategory,
    mood,
    setMood,
    query,
    setQuery,
    filteredItems,
    isOpen,
    now,
    soundOn,
    toggleSound,
    playSound,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
