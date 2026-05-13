import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { usePhantomMode } from "@/components/PhantomModeContext";

export const Route = createFileRoute("/secret")({
  head: () => ({
    meta: [
      { title: "—" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SecretPage,
});

const games = [
  { title: "Persona 5 Royal", note: "UI direction & rhythm" },
  { title: "NieR: Automata", note: "Menus as part of the story" },
  { title: "Hollow Knight", note: "Atmosphere over instruction" },
  { title: "Outer Wilds", note: "Discovery as the only progression" },
  { title: "Hades", note: "Iteration as a feature" },
];

const inspirations = [
  { label: "Typography", value: "Sharp, oversized, slightly off-axis" },
  { label: "Motion", value: "Hard cuts > soft fades" },
  { label: "Color", value: "One accent, used violently" },
  { label: "Composition", value: "Diagonals, layered cards, broken grids" },
];

const setup = [
  { k: "Editor", v: "VS Code · JetBrains Mono" },
  { k: "OS", v: "Windows + WSL2" },
  { k: "Terminal", v: "Windows Terminal · Oh My Posh" },
  { k: "Music", v: "Lo-fi, OST, occasional Phonk" },
];

function SecretPage() {
  const { active } = usePhantomMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (!active) {
      const t = window.setTimeout(() => navigate({ to: "/" }), 1500);
      return () => clearTimeout(t);
    }
  }, [active, navigate]);

  if (!active) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground/60 uppercase">
            access denied
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground/40">
            redirecting…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-24">
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-[10px] tracking-[0.4em] text-primary uppercase">
                // hidden_archive
              </p>
              <h1 className="mt-3 font-display text-5xl font-bold tracking-tight sm:text-7xl">
                Off the Record
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                A small archive of things that shape how I build — kept out of
                the main résumé on purpose.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2 rounded-xl border border-primary/30 bg-card p-6 relative overflow-hidden"
                style={{ transform: "rotate(-0.4deg)" }}
              >
                <div className="absolute -top-px -left-px h-3 w-3 bg-primary" />
                <div className="absolute -bottom-px -right-px h-3 w-3 bg-primary" />
                <p className="font-mono text-[10px] tracking-widest text-primary uppercase">
                  game shelf
                </p>
                <ul className="mt-4 divide-y divide-border">
                  {games.map((g) => (
                    <li key={g.title} className="flex items-baseline justify-between py-3 group">
                      <span className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
                        {g.title}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {g.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="font-mono text-[10px] tracking-widest text-primary uppercase">
                  setup
                </p>
                <dl className="mt-4 space-y-3">
                  {setup.map((s) => (
                    <div key={s.k} className="flex justify-between gap-4 text-xs">
                      <dt className="font-mono uppercase tracking-wider text-muted-foreground">{s.k}</dt>
                      <dd className="text-right text-foreground">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-3 rounded-xl border border-border bg-card p-6"
              >
                <p className="font-mono text-[10px] tracking-widest text-primary uppercase">
                  design notebook
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {inspirations.map((i) => (
                    <div key={i.label} className="border-l-2 border-primary/60 pl-3">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {i.label}
                      </p>
                      <p className="mt-1 text-sm text-foreground">{i.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="mt-16 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
              <span>— end of file —</span>
              <Link to="/" className="hover:text-primary">return ↵</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}