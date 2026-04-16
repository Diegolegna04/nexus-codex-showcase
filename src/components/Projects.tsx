import { motion } from "framer-motion";
import { useNerdMode } from "./NerdModeContext";

interface Project {
  title: string;
  nerdTitle?: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "Task Manager",
    nerdTitle: "Quest Log",
    description: "A real-time task management app with drag-and-drop, filters, and team collaboration features.",
    tech: ["Angular", "Firebase", "TypeScript"],
  },
  {
    title: "Weather Dashboard",
    nerdTitle: "Realm Scanner",
    description: "A clean weather dashboard fetching live data with animated charts and location search.",
    tech: ["Angular", "Chart.js", "OpenWeather API"],
  },
  {
    title: "Dev Blog",
    nerdTitle: "Codex Entries",
    description: "A minimal blog platform with markdown rendering, syntax highlighting, and dark mode.",
    tech: ["Angular", "Node.js", "MongoDB"],
  },
];

export default function Projects() {
  const { nerdMode } = useNerdMode();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
            {nerdMode ? "// side_quests" : "// more projects"}
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {nerdMode ? "Side Quests" : "Other Projects"}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-10px_var(--glow-muted)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground/50 uppercase">
                  {nerdMode ? `mission_0${i + 2}` : `project_0${i + 2}`}
                </span>
                <svg className="h-4 w-4 text-muted-foreground/30 transition-colors group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground">
                {nerdMode ? (project.nerdTitle || project.title) : project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[9px] tracking-wider text-muted-foreground/70 uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
