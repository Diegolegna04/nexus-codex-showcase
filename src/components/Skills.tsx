import { motion } from "framer-motion";

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
      { name: "Angular", level: 95, description: "Enterprise apps, NgRx, lazy loading, custom libraries" },
      { name: "TypeScript", level: 90, description: "Advanced types, generics, utility types, strict mode" },
      { name: "HTML / CSS / SCSS", level: 92, description: "Semantic markup, BEM, CSS Grid, animations" },
      { name: "RxJS", level: 85, description: "Complex async flows, custom operators, state management" },
      { name: "React", level: 70, description: "Hooks, context, component patterns, basic SSR" },
    ],
  },
  {
    label: "Backend",
    icon: "◇",
    skills: [
      { name: "Node.js", level: 80, description: "REST APIs, middleware, authentication, file handling" },
      { name: "Express", level: 78, description: "Routing, error handling, validation, rate limiting" },
      { name: "REST APIs", level: 88, description: "Design, versioning, documentation, testing" },
      { name: "MongoDB", level: 72, description: "Schema design, aggregation, indexing strategies" },
      { name: "SQL", level: 70, description: "Complex queries, joins, migrations, optimization" },
    ],
  },
  {
    label: "Tools & DevOps",
    icon: "○",
    skills: [
      { name: "Git", level: 90, description: "Branching strategies, rebasing, CI integration" },
      { name: "Docker", level: 65, description: "Containerization, compose, basic orchestration" },
      { name: "CI/CD", level: 72, description: "GitHub Actions, automated testing, deployments" },
      { name: "Figma", level: 60, description: "Design handoff, prototyping, component inspection" },
      { name: "Testing", level: 75, description: "Unit, integration, e2e with Jasmine/Karma/Cypress" },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-[0_4px_20px_-8px_var(--glow-muted)]"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="font-mono text-[10px] text-primary tracking-wider">{skill.level}%</span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/50">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full origin-left"
          style={{
            width: `${skill.level}%`,
            background: skill.level > 90
              ? "linear-gradient(90deg, var(--primary), var(--glow))"
              : "var(--primary)",
            boxShadow: skill.level > 90 ? "0 0 8px var(--glow-muted)" : "none",
          }}
        />
      </div>

      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-10">
        {skill.description}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
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
            Skills & Expertise
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Technologies and tools I work with daily to build modern, performant web applications.
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
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={ci * 0.1 + si * 0.05}
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
