import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "./ThemeContext";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          dl
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
          <ThemeSwitcher />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
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
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                Theme: {theme}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
