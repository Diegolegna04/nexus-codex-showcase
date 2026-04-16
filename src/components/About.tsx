import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  expanded?: boolean;
}

export default function About({ expanded = false }: Props) {
  const [clickCount, setClickCount] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);

  const handleAvatarClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 7) {
      setEasterEgg(true);
      setTimeout(() => setEasterEgg(false), 3000);
      setClickCount(0);
    }
  }, [clickCount]);

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
              // about
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              About
            </h2>
          </div>
          {!expanded && (
            <Link
              to="/about"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              Read more →
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid gap-10 lg:grid-cols-3"
        >
          {/* Avatar */}
          <div className="relative mx-auto w-full max-w-xs lg:mx-0">
            <button
              onClick={handleAvatarClick}
              className="w-full overflow-hidden rounded-xl border border-border bg-card p-1 shadow-sm cursor-default focus:outline-none"
            >
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-primary/8 via-surface-elevated to-surface relative overflow-hidden">
                <AnimatePresence>
                  {easterEgg && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center bg-surface/90 backdrop-blur-sm z-10"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">🗡️</div>
                        <p className="font-mono text-[10px] text-primary tracking-wider">
                          Nothing is true
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="text-center select-none">
                  <div className="text-6xl">👨‍💻</div>
                </div>
              </div>
            </button>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card px-4 py-1.5 shadow-sm">
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                available
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              I'm a Full Stack Developer with a deep focus on <span className="text-foreground font-medium">Angular</span> and the modern web ecosystem. I love turning complex problems into clean, intuitive interfaces that feel right.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Beyond code, I'm passionate about UI architecture, component design systems, and building tools that developers actually enjoy using. Every project is an opportunity to craft something meaningful.
            </p>

            {expanded && (
              <>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  With a strong foundation in TypeScript and reactive programming, I build applications that are not just functional but maintainable and scalable. I believe in clean code, thorough testing, and thoughtful design.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or diving deep into topics that inspire me. I'm always looking for the next challenge.
                </p>
              </>
            )}

            {!expanded && (
              <div className="mt-6 sm:hidden">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
                >
                  Read more →
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
