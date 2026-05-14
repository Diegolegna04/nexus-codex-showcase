import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePhantomMode } from "@/components/PhantomModeContext";

export const Route = createFileRoute("/anteroom")({
  head: () => ({
    meta: [
      { title: "—" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AnteroomPage,
});

const reflections = [
  {
    label: "Discipline",
    body: "Years of Angular taught me that structure is freedom — strict typing and clear boundaries are what make creativity sustainable.",
  },
  {
    label: "Curiosity",
    body: "I read code the way I play games — looking for the system underneath. Every codebase has a rhythm; the job is to find it.",
  },
  {
    label: "Craft",
    body: "Interfaces are a quiet kind of writing. Spacing, motion and timing carry meaning long before any copy does.",
  },
  {
    label: "Patience",
    body: "The bug you cannot solve at midnight usually solves itself by morning. Time is part of the toolchain.",
  },
];

function AnteroomPage() {
  const { active } = usePhantomMode();
  const navigate = useNavigate();

  // Apply velvet body class for full-page palette shift.
  useEffect(() => {
    document.documentElement.classList.add("velvet");
    return () => document.documentElement.classList.remove("velvet");
  }, []);

  // Gentle redirect if user lands here without phantom mode.
  useEffect(() => {
    if (!active) {
      const t = window.setTimeout(() => navigate({ to: "/" }), 2000);
      return () => clearTimeout(t);
    }
  }, [active, navigate]);

  return (
    <div className="velvet-shell relative min-h-screen overflow-hidden">
      {/* Slow red→blue transition wash on entry */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[70]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.6 0.25 25 / 0.55), oklch(0.08 0.005 20) 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.35 0.18 260 / 0.35), transparent 60%)",
        }}
      />

      {/* Floating drifting motes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute block rounded-full"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 41) % 100}%`,
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: "oklch(0.85 0.1 250 / 0.55)",
              boxShadow: "0 0 12px oklch(0.7 0.18 250 / 0.6)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 8 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: "var(--velvet-accent)" }}>
            // antechamber
          </p>
          <h1
            className="mt-4 font-display text-4xl font-light leading-tight sm:text-6xl"
            style={{ color: "var(--velvet-fg)", letterSpacing: "-0.01em" }}
          >
            A place between<br />
            <span style={{ color: "var(--velvet-accent)", fontStyle: "italic" }}>
              code and reality.
            </span>
          </h1>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--velvet-muted)" }}
          >
            Step away from the noise. Past the deadlines, the tickets, the
            late-night merges — this is the quiet room behind the work, where I
            keep the reasons.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {reflections.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.4,
                delay: 1.6 + i * 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group relative rounded-2xl p-6 backdrop-blur-sm transition-all duration-700"
              style={{
                background: "oklch(0.18 0.06 260 / 0.55)",
                border: "1px solid oklch(0.55 0.18 260 / 0.35)",
                boxShadow:
                  "inset 0 1px 0 oklch(0.85 0.1 250 / 0.1), 0 30px 60px -30px oklch(0.45 0.2 260 / 0.45)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--velvet-accent)" }}
              >
                {r.label}
              </p>
              <p
                className="mt-3 font-display text-lg font-light leading-relaxed"
                style={{ color: "var(--velvet-fg)" }}
              >
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="mt-20 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.4em]"
          style={{ color: "var(--velvet-muted)" }}
        >
          <span>— intermission —</span>
          <Link
            to="/"
            className="transition-colors"
            style={{ color: "var(--velvet-accent)" }}
          >
            return to the surface ↵
          </Link>
        </motion.div>
      </div>
    </div>
  );
}