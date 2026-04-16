import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

interface Props {
  limit?: number;
  showViewAll?: boolean;
}

export default function Projects({ limit, showViewAll = false }: Props) {
  const items = limit ? projects.filter((p) => !p.featured).slice(0, limit) : projects.filter((p) => !p.featured);

  return (
    <section className="px-6 py-24">
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
              // projects
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Other Projects
            </h2>
          </div>
          {showViewAll && (
            <Link
              to="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              View all
              <span>→</span>
            </Link>
          )}
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to="/projects/$projectId"
                params={{ projectId: project.id }}
                className="group relative block overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_var(--glow-muted)] hover:-translate-y-0.5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                    {project.year}
                  </span>
                  <svg className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
            >
              View all projects →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
