import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

type Theme = "dark" | "light" | "dim";

interface ThemePreviewColors {
  bg: string;
  surface: string;
  border: string;
  text: string;
  primary: string;
}

const themeMeta: { id: Theme; label: string; hint: string; colors: ThemePreviewColors }[] = [
  {
    id: "dark",
    label: "Dark",
    hint: "Default",
    colors: {
      bg: "oklch(0.13 0.012 260)",
      surface: "oklch(0.21 0.012 260)",
      border: "oklch(0.26 0.012 260)",
      text: "oklch(0.93 0.005 260)",
      primary: "oklch(0.72 0.14 192)",
    },
  },
  {
    id: "light",
    label: "Light",
    hint: "Clean",
    colors: {
      bg: "oklch(0.98 0.002 260)",
      surface: "oklch(0.97 0.003 260)",
      border: "oklch(0.9 0.005 260)",
      text: "oklch(0.15 0.015 260)",
      primary: "oklch(0.55 0.16 192)",
    },
  },
  {
    id: "dim",
    label: "Dim",
    hint: "Midnight",
    colors: {
      bg: "oklch(0.18 0.01 260)",
      surface: "oklch(0.26 0.01 260)",
      border: "oklch(0.3 0.01 260)",
      text: "oklch(0.88 0.006 260)",
      primary: "oklch(0.68 0.13 192)",
    },
  },
];

function ThemeThumbnail({ colors }: { colors: ThemePreviewColors }) {
  return (
    <div
      className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border"
      style={{ background: colors.bg, borderColor: colors.border }}
    >
      {/* fake nav bar */}
      <div
        className="absolute inset-x-0 top-0 h-2 border-b"
        style={{ background: colors.surface, borderColor: colors.border }}
      />
      {/* fake content blocks */}
      <div
        className="absolute left-1.5 top-3.5 h-1 w-5 rounded-sm"
        style={{ background: colors.text, opacity: 0.85 }}
      />
      <div
        className="absolute left-1.5 top-5.5 h-1 w-8 rounded-sm"
        style={{ background: colors.text, opacity: 0.4 }}
      />
      {/* accent dot */}
      <div
        className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full"
        style={{ background: colors.primary, boxShadow: `0 0 6px ${colors.primary}` }}
      />
    </div>
  );
}

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = themeMeta.find((t) => t.id === theme) ?? themeMeta[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}`}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
        title={`Theme: ${current.label}`}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none" opacity="0.18" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
            role="menu"
            className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-border bg-popover/95 p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl z-50"
          >
            <div className="px-2 pb-1.5 pt-1">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Theme
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {themeMeta.map((t) => {
                const active = t.id === theme;
                return (
                  <button
                    key={t.id}
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={`group flex items-center gap-3 rounded-lg border px-2 py-2 text-left transition-all ${
                      active
                        ? "border-primary/40 bg-primary/5"
                        : "border-transparent hover:border-border hover:bg-muted/40"
                    }`}
                  >
                    <ThemeThumbnail colors={t.colors} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{t.label}</span>
                        {active && (
                          <span className="font-mono text-[9px] tracking-wider text-primary uppercase">
                            active
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                        {t.hint}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
