import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Diego Legnaro" },
      { name: "description", content: "Selected projects by Diego Legnaro: Angular full-stack apps, internship work and personal builds." },
      { property: "og:title", content: "Projects — Diego Legnaro" },
      { property: "og:description", content: "Angular full-stack apps, internship work and personal builds." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20">
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
                // all projects
              </p>
              <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                Projects
              </h1>
              <p className="mt-4 max-w-lg text-sm text-muted-foreground">
                A focused selection — full-stack work, internship deliveries and
                personal builds where I owned the stack end to end.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: project.id }}
                    className="group relative block overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_var(--glow-muted)] hover:-translate-y-0.5"
                  >
                    {project.featured && (
                      <span className="absolute top-4 right-4 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[9px] tracking-wider text-primary uppercase">
                        Featured
                      </span>
                    )}
                    <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                      {project.year} · {project.role}
                    </span>

                    <h2 className="mt-3 font-display text-xl font-semibold text-foreground">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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

                    <div className="mt-5 flex items-center gap-1 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View details <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </div>
    </div>
  );
}
