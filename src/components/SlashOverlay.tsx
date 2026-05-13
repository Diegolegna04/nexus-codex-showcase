import { AnimatePresence, motion } from "framer-motion";
import { usePhantomMode } from "./PhantomModeContext";

export default function SlashOverlay() {
  const { slashState } = usePhantomMode();

  return (
    <AnimatePresence>
      {slashState.running && (
        <motion.div
          key={slashState.key}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
          aria-hidden="true"
        >
          {/* dark wash */}
          <div
            className="absolute inset-0 bg-black"
            style={{ animation: "phantom-wash 1s ease-out forwards" }}
          />
          {/* main red slash */}
          <div
            className="absolute -inset-y-32 left-0 w-[160%] bg-[oklch(0.6_0.25_25)]"
            style={{
              animation: "phantom-slash-long 1s cubic-bezier(0.7,0,0.2,1) forwards",
              boxShadow: "0 0 100px oklch(0.6 0.25 25 / 70%)",
            }}
          />
          {/* thin white slash trail */}
          <div
            className="absolute left-0 w-[160%] bg-white"
            style={{
              top: "48%",
              height: "2px",
              animation: "phantom-slash-long 1s 0.12s cubic-bezier(0.7,0,0.2,1) forwards",
              boxShadow: "0 0 20px white",
            }}
          />
          {/* secondary cyan slash */}
          <div
            className="absolute left-0 w-[160%] bg-[oklch(0.78_0.13_210)]"
            style={{
              top: "62%",
              height: "6px",
              animation: "phantom-slash-long 1s 0.18s cubic-bezier(0.7,0,0.2,1) forwards",
              opacity: 0.7,
              boxShadow: "0 0 30px oklch(0.78 0.13 210 / 80%)",
            }}
          />
          {/* magenta accent */}
          <div
            className="absolute left-0 w-[160%] bg-[oklch(0.65_0.27_340)]"
            style={{
              top: "36%",
              height: "3px",
              animation: "phantom-slash-long 1s 0.24s cubic-bezier(0.7,0,0.2,1) forwards",
              opacity: 0.8,
              boxShadow: "0 0 24px oklch(0.65 0.27 340 / 80%)",
            }}
          />
          {slashState.label && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p
                className="font-display text-4xl font-bold tracking-[0.4em] text-white sm:text-6xl"
                style={{
                  animation: "phantom-label 1s ease-out forwards",
                  textShadow: "0 0 30px oklch(0.6 0.25 25 / 80%)",
                }}
              >
                {slashState.label}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}