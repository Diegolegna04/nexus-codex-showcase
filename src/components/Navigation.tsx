import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const themeIcons: Record<string, string> = {
  dark: "◐",
  light: "○",
  dim: "◑",
};

const themeOrder = ["dark", "light", "dim"] as const;

export default function Navigation() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cycleTheme = () => {
    const idx = themeOrder.indexOf(theme as typeof themeOrder[number]);
    setTheme(themeOrder[(idx + 1) % themeOrder.length]);
  };

  const isHome = location.pathname === "/";

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
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-foreground">
          <span className="text-primary">&lt;</span>
          dev
          <span className="text-primary">/&gt;</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {isHome && (
            <a
              href="#skills"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary uppercase"
            >
              Skills
            </a>
          )}
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary uppercase"
              activeProps={{ className: "font-mono text-xs tracking-wider text-primary uppercase" }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={cycleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            title={`Theme: ${theme}`}
          >
            <span className="text-sm">{themeIcons[theme]}</span>
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
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={cycleTheme}
                className="font-mono text-xs text-muted-foreground hover:text-primary text-left"
              >
                Theme: {theme} {themeIcons[theme]}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
