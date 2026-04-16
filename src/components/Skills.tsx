import { motion } from "framer-motion";
import { useNerdMode } from "./NerdModeContext";

interface SkillCategory {
  label: string;
  nerdLabel?: string;
  skills: { name: string; level: number; nerdLevel?: string }[];
}

const categories: SkillCategory[] = [
  {
    label: "Frontend",
    nerdLabel: "Offense",
    skills: [
      { name: "Angular", level: 95, nerdLevel: "9000+" },
      { name: "TypeScript", level: 90 },
      { name: "HTML / CSS / SCSS", level: 92 },
      { name: "RxJS", level: 85 },
      { name: "React", level: 70 },
    ],
  },
  {
    label: "Backend",
    nerdLabel: "Defense",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 78 },
      { name: "REST APIs", level: 88 },
      { name: "MongoDB", level: 72 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    label: "Tools & More",
    nerdLabel: "Support",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 65 },
      { name: "CI/CD", level: 72 },
      { name: "Figma", level: 60 },
      { name: "Testing", level: 75 },
    ],
  },
];

export default function Skills() {
  const { nerdMode } = useNerdMode();

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
            {nerdMode ? "// power_levels" : "// skills"}
          </p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            {nerdMode ? "Power Levels" : "Skills"}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className="rounded-lg border border-border bg-surface p-6"
            >
              <h3 className="font-display text-sm font-semibold tracking-wide text-foreground uppercase">
                {nerdMode ? (cat.nerdLabel || cat.label) : cat.label}
              </h3>

              <div className="mt-6 space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">{skill.name}</span>
                      <span className="font-mono text-[10px] text-primary">
                        {nerdMode && skill.nerdLevel ? skill.nerdLevel : `${skill.level}%`}
                      </span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: ci * 0.1 + si * 0.05, ease: "easeOut" }}
                        className="h-full rounded-full bg-primary"
                        style={{
                          boxShadow: skill.level > 90 ? "0 0 8px var(--glow-muted)" : "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
