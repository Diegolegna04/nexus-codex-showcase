import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  description: string;
}

interface SkillCategory {
  label: string;
  icon: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    label: "Frontend",
    icon: "◆",
    skills: [
      { name: "Angular", level: 90, description: "Component architecture, RxJS, reactive forms, routing, lazy loading" },
      { name: "TypeScript", level: 88, description: "Strict typing, generics, advanced types in real projects" },
      { name: "JavaScript (ES6+)", level: 88, description: "Modern syntax, async/await, modules, DOM APIs" },
      { name: "CSS3 / Responsive", level: 85, description: "Flexbox, Grid, responsive layouts, mobile-first design" },
      { name: "React", level: 65, description: "Hooks, components, growing day by day" },
      { name: "Next.js (SSG/SSR)", level: 55, description: "Server-side rendering and static generation fundamentals" },
    ],
  },
  {
    label: "Backend",
    icon: "◇",
    skills: [
      { name: "Java", level: 75, description: "Used as the main backend language for full-stack projects" },
      { name: "Quarkus", level: 70, description: "REST endpoints, dependency injection, Maven builds" },
      { name: "REST APIs", level: 80, description: "Designing, consuming and documenting clean HTTP APIs" },
      { name: "WebSocket", level: 65, description: "Real-time communication between client and server" },
      { name: "PHP", level: 55, description: "Built an internal web app for course deadline tracking" },
    ],
  },
  {
    label: "Tools & Data",
    icon: "○",
    skills: [
      { name: "Git", level: 85, description: "Branching, versioning, conflict resolution, team workflows" },
      { name: "MongoDB", level: 65, description: "Document modeling, queries, integration with Java backends" },
      { name: "MySQL", level: 65, description: "Schema design, joins and queries for relational data" },
      { name: "Figma", level: 50, description: "Reading and translating designs into production interfaces" },
    ],
  },
];

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1200;
    const startTime = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return <span>{value}</span>;
}

function SkillCard({ skill, delay, active }: { skill: Skill; delay: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_20px_-8px_var(--glow-muted)]"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="font-mono text-[10px] text-primary tracking-wider tabular-nums">
          <CountUp target={skill.level} active={active} />%
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/50">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.15, ease: "easeOut" }}
          className="h-full rounded-full origin-left"
          style={{
            width: `${skill.level}%`,
            background: skill.level > 85
              ? "linear-gradient(90deg, var(--primary), var(--glow))"
              : "var(--primary)",
            boxShadow: skill.level > 85 ? "0 0 8px var(--glow-muted)" : "none",
          }}
        />
      </div>

      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-12">
        {skill.description}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={sectionRef} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] text-primary uppercase mb-2">
            // skills
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Skills & Stack
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            The tools I reach for daily, grouped by where they live in the stack.
            Levels reflect comfort and real project usage, not ceiling.
          </p>
        </motion.div>

        <div className="mt-14 space-y-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-primary text-lg">{cat.icon}</span>
                <h3 className="font-display text-lg font-semibold tracking-wide text-foreground">
                  {cat.label}
                </h3>
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60 uppercase tabular-nums">
                  {cat.skills.length} skills
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.skills.map((skill, si) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={ci * 0.1 + si * 0.05}
                    active={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
