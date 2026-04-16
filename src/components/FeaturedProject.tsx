import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { getFeaturedProject } from "@/lib/projects";

export default function FeaturedProject() {
  const project = getFeaturedProject();
  if (!project) return null;

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
            // featured
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Featured Project
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 grid gap-8 lg:grid-cols-5"
        >
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:col-span-3">
            <div className="aspect-video w-full bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-6xl font-bold text-primary/20">アニメ</div>
                <div className="mt-2 font-mono text-xs text-muted-foreground/50">App Preview</div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          <div className="flex flex-col justify-center lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/projects/$projectId"
                params={{ projectId: project.id }}
                className="group/btn inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-primary-foreground uppercase transition-all hover:shadow-[0_4px_20px_var(--glow-muted)]"
              >
                View details
                <span className="transition-transform group-hover/btn:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
