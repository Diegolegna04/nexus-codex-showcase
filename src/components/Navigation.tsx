import { useState, useEffect } from "react";
import { useNerdMode } from "./NerdModeContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { nerdMode, toggleNerdMode } = useNerdMode();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-lg font-bold tracking-tight text-foreground">
          <span className="text-primary">&lt;</span>
          dev
          <span className="text-primary">/&gt;</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary uppercase"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleNerdMode}
            className={`relative rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
              nerdMode
                ? "border-primary bg-primary/10 text-primary shadow-[0_0_12px_var(--glow-muted)]"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
            }`}
          >
            {nerdMode ? "// nerd_mode: ON" : "// nerd_mode: OFF"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={toggleNerdMode}
                className="font-mono text-xs text-muted-foreground hover:text-primary text-left"
              >
                {nerdMode ? "// nerd_mode: ON" : "// nerd_mode: OFF"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
