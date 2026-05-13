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
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
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
    const trigger = () => {
      setActive(true);
      activate("konami");
      window.setTimeout(() => setActive(false), 2200);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activate]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
          aria-hidden="true"
        >
          {/* black flash */}
          <div
            className="absolute inset-0 bg-black"
            style={{ animation: "phantom-flash 1.4s ease-out forwards" }}
          />
          {/* red diagonal slash */}
          <div
            className="absolute -inset-y-20 left-0 w-[140%] bg-[oklch(0.6_0.25_25)]"
            style={{
              animation: "phantom-slash 0.9s cubic-bezier(0.7,0,0.2,1) forwards",
              boxShadow: "0 0 80px oklch(0.6 0.25 25 / 60%)",
            }}
          />
          {/* second slash */}
          <div
            className="absolute -inset-y-20 left-0 w-[140%] bg-white/95"
            style={{
              animation: "phantom-slash 0.9s 0.15s cubic-bezier(0.7,0,0.2,1) forwards",
              height: "8%",
              top: "46%",
            }}
          />
          {/* calling card */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative max-w-sm border-2 border-white bg-black px-10 py-8 shadow-[0_30px_80px_-20px_rgba(220,38,38,0.6)]"
              style={{ animation: "phantom-card-in 0.7s 0.5s cubic-bezier(0.2,0.9,0.2,1.2) both, phantom-card-out 0.4s 1.4s ease-in forwards" }}
            >
              <div className="absolute -left-2 -top-2 h-4 w-4 bg-[oklch(0.6_0.25_25)]" />
              <div className="absolute -right-2 -bottom-2 h-4 w-4 bg-[oklch(0.6_0.25_25)]" />
              <p className="font-mono text-[10px] tracking-[0.4em] text-[oklch(0.6_0.25_25)] uppercase">
                — calling card —
              </p>
              <p className="mt-3 font-display text-3xl font-bold leading-tight text-white">
                Your code<br />has been<br /><span className="text-[oklch(0.6_0.25_25)]">stolen.</span>
              </p>
              <p className="mt-4 font-mono text-[10px] tracking-widest text-white/60 uppercase">
                — the phantom dev
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
