import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { getProject } from "@/lib/projects";
import { usePhantomMode } from "@/components/PhantomModeContext";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = getProject(params.projectId);
    return {
      meta: project
        ? [
            { title: `${project.title} — Diego Legnaro` },
            { name: "description", content: project.description },
            { property: "og:title", content: `${project.title} — Diego Legnaro` },
            { property: "og:description", content: project.description },
          ]
        : [{ title: "Project Not Found" }],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block font-mono text-xs text-primary uppercase">
          ← Back to projects
        </Link>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const project = getProject(projectId);
  const { triggerSlash } = usePhantomMode();

  useEffect(() => {
    triggerSlash(project ? project.title.split(" ")[0].toUpperCase() : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (!project) {
    throw notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-20">
        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary mb-8"
              >
                ← Back to projects
              </Link>

              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                  {project.year}
                </span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                  {project.role}
                </span>
                {project.featured && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] tracking-wider text-primary uppercase">
                      Featured
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                {project.title}
              </h1>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="aspect-video w-full bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-6xl font-bold text-primary/20">
                    {project.title.charAt(0)}
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground/50">
                    Project Preview
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 grid gap-8 lg:grid-cols-3"
            >
              <div className="lg:col-span-2">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">Overview</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.longDescription}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.links && project.links.length > 0 && (
                  <div>
                    <h3 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3">
                      Links
                    </h3>
                    <div className="flex flex-col gap-2">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 font-mono text-xs tracking-wider text-muted-foreground uppercase transition-all hover:border-primary/30 hover:text-primary hover:shadow-sm"
                        >
                          {link.label}
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
