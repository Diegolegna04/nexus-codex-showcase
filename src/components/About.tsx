import { motion } from "framer-motion";
import { useNerdMode } from "./NerdModeContext";

export default function About() {
  const { nerdMode } = useNerdMode();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
            {nerdMode ? "// character_profile" : "// about me"}
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {nerdMode ? "Character Profile" : "About"}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid gap-10 lg:grid-cols-3"
        >
          {/* Avatar card */}
          <div className="relative mx-auto w-full max-w-xs lg:mx-0">
            <div className="overflow-hidden rounded-lg border border-border bg-surface p-1">
              <div className="flex aspect-square items-center justify-center rounded-md bg-gradient-to-br from-primary/10 via-surface-elevated to-surface">
                <div className="text-center">
                  <div className="text-6xl">👨‍💻</div>
                  {nerdMode && (
                    <p className="mt-3 font-mono text-[9px] tracking-widest text-muted-foreground/40 uppercase">
                      class: full_stack_dev
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-1.5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-primary uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                {nerdMode ? "online — ready" : "available"}
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
            {nerdMode && (
              <div className="mt-6 rounded border border-border bg-surface/50 p-4">
                <p className="font-mono text-[10px] leading-relaxed text-muted-foreground/60">
                  <span className="text-primary">$</span> cat /stats/developer.log<br />
                  → angular_proficiency: expert<br />
                  → coffee_consumed: ∞<br />
                  → bugs_squashed: 9000+<br />
                  → favorite_anime: classified<br />
                  → status: nothing_is_true_everything_is_permitted
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
