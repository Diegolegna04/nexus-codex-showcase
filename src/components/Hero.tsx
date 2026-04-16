import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNerdMode } from "./NerdModeContext";

const roles = ["Full Stack Developer", "Angular Enthusiast", "UI Architect", "Problem Solver"];

export default function Hero() {
  const { nerdMode } = useNerdMode();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.015]">
        <div className="absolute left-0 right-0 h-[2px] bg-primary animate-scanline" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        {/* System init text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase"
        >
          {nerdMode ? "> animus_session.initialize()" : "> session.start()"}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
        >
          Your Name
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-4 h-8"
        >
          <span className="font-mono text-lg text-primary sm:text-xl">
            {displayed}
            <span className="animate-typing-cursor text-primary">|</span>
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground"
        >
          {nerdMode
            ? "Building digital experiences with precision and passion. Eagle Vision: activated."
            : "Building digital experiences with precision and passion. Specializing in Angular and modern web technologies."}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 font-mono text-xs font-medium tracking-wider text-primary-foreground uppercase transition-all hover:shadow-[0_0_20px_var(--glow-muted)]"
          >
            {nerdMode ? "View missions" : "View projects"}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-2.5 font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase transition-all hover:border-primary/50 hover:text-primary"
          >
            Contact
          </a>
        </motion.div>

        {/* Status line */}
        {nerdMode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-12 font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase"
          >
            {"// status: access_granted — synchronization: 100%"}
          </motion.p>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-widest text-muted-foreground/40 uppercase">scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-muted-foreground/40 to-transparent animate-float" />
        </div>
      </motion.div>
    </section>
  );
}
