import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePhantomMode } from "./PhantomModeContext";

interface Props {
  expanded?: boolean;
}

export default function About({ expanded = false }: Props) {
  const { displayName, active } = usePhantomMode();
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
            <div className="w-full overflow-hidden rounded-xl border border-border bg-card p-1 shadow-sm">
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-primary/8 via-surface-elevated to-surface relative overflow-hidden">
                {/* Minimal SVG developer avatar — placeholder, easily replaceable */}
                <svg
                  viewBox="0 0 200 200"
                  className="h-3/5 w-3/5 text-primary/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="100" cy="78" r="32" />
                  <path d="M40 170c0-33 27-58 60-58s60 25 60 58" />
                  <path d="M82 80l-10 8 10 8" />
                  <path d="M118 80l10 8-10 8" opacity="0.6" />
                </svg>
              </div>
            </div>
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
              {active ? `I am ${displayName}. ` : ""}
              I'm a junior web developer recently graduated from{" "}
              <span className="text-foreground font-medium">ITS INCOM</span>, with
              a strong focus on <span className="text-foreground font-medium">Angular</span>{" "}
              and the modern TypeScript ecosystem. I work end to end — from frontend
              architecture down to REST APIs and data — and I care about clean,
              maintainable code.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I'm autonomous, curious, and comfortable owning a feature from idea
              to production. I move easily between solo work and team settings, and
              I'm always learning — whether that's a new framework, a backend stack,
              or a better way to structure a component.
            </p>

            {expanded && (
              <>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  My main playground is Angular: reactive patterns with RxJS,
                  component design, responsive layouts and integration with REST
                  and WebSocket APIs. On the backend I work with Java and Quarkus,
                  and I've shipped a full-stack personal project (a MyAnimeList
                  clone) backed by MongoDB.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Outside of Angular, I'm building up React, exploring Next.js for
                  SSR/SSG, and sharpening my fundamentals around databases and
                  API design. The goal stays the same: ship interfaces that feel
                  effortless to use and are pleasant to work on.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      Based in
                    </p>
                    <p className="mt-1 text-sm text-foreground">Cilavegna, IT</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      Education
                    </p>
                    <p className="mt-1 text-sm text-foreground">ITS INCOM '25</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                      Languages
                    </p>
                    <p className="mt-1 text-sm text-foreground">IT · EN (B2)</p>
                  </div>
                </div>
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
