import { motion } from "framer-motion";
import { useNerdMode } from "./NerdModeContext";

const techStack = ["Angular", "TypeScript", "REST API", "SCSS", "RxJS"];

export default function FeaturedProject() {
  const { nerdMode } = useNerdMode();

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
            {nerdMode ? "// primary_mission" : "// featured project"}
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {nerdMode ? "Main Quest" : "Featured Project"}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid gap-8 lg:grid-cols-5"
        >
          {/* Preview */}
          <div className="group relative overflow-hidden rounded-lg border border-border bg-surface lg:col-span-3">
            <div className="aspect-video w-full bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-6xl font-bold text-primary/20">アニメ</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground/50">MyAnimeList Clone — App Preview</div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-foreground">
              Anime Tracker
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A full-featured anime tracking application inspired by MyAnimeList. Browse, search, and track your anime library with a sleek, responsive interface built entirely with Angular.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border bg-surface px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#"
                className="group/btn inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-primary-foreground uppercase transition-all hover:shadow-[0_0_20px_var(--glow-muted)]"
              >
                {nerdMode ? "Start mission" : "View project"}
                <span className="transition-transform group-hover/btn:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
