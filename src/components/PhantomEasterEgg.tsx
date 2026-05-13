import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePhantomMode } from "./PhantomModeContext";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function PhantomEasterEgg() {
  const { activate } = usePhantomMode();
  const [card, setCard] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const trigger = () => {
      activate("konami");
      window.setTimeout(() => setCard(true), 700);
      window.setTimeout(() => setCard(false), 3200);
    };
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer = [...buffer, key].slice(-SEQUENCE.length);
      if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k === SEQUENCE[i])) {
        buffer = [];
        trigger();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activate]);

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="relative max-w-sm border-2 border-white bg-black px-10 py-8 shadow-[0_30px_80px_-20px_rgba(220,38,38,0.6)]"
            style={{
              animation:
                "phantom-card-in 0.6s cubic-bezier(0.2,0.9,0.2,1.2) both, phantom-card-out 0.4s 2s ease-in forwards",
            }}
          >
            <div className="absolute -left-2 -top-2 h-4 w-4 bg-[oklch(0.6_0.25_25)]" />
            <div className="absolute -right-2 -bottom-2 h-4 w-4 bg-[oklch(0.6_0.25_25)]" />
            <p className="font-mono text-[10px] tracking-[0.4em] text-[oklch(0.6_0.25_25)] uppercase">
              — calling card —
            </p>
            <p className="mt-3 font-display text-3xl font-bold leading-tight text-white">
              Your code<br />has been<br />
              <span className="text-[oklch(0.6_0.25_25)]">stolen.</span>
            </p>
            <p className="mt-4 font-mono text-[10px] tracking-widest text-white/60 uppercase">
              — the phantom dev
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
