import { Moon, Sun, Menu, X, MonitorSmartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type ThemeMode = "light" | "dark" | "auto";

interface NavbarProps {
  isDark: boolean;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
}

function themeIcon(mode: ThemeMode) {
  if (mode === "light") return <Sun size={16} aria-hidden="true" />;
  if (mode === "dark") return <Moon size={16} aria-hidden="true" />;
  return <MonitorSmartphone size={16} aria-hidden="true" />;
}

function themeLabel(mode: ThemeMode) {
  if (mode === "light") return "Light mode — click to switch to dark";
  if (mode === "dark") return "Dark mode — click to switch to system auto";
  return "Auto (follows system) — click to switch to light";
}

export function Navbar({ themeMode, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "work", "process", "about", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Process", href: "#process", id: "process" },
    { label: "About", href: "#about", id: "about" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          aria-label="Daniela Fermin Rennola — back to top"
          className="flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 rounded"
        >
          {/* Monogram */}
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
            }}
            aria-hidden="true"
          >
            DFR
          </span>
          <span
            className="hidden sm:block"
            style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: "0.95rem" }}
          >
            Daniela Fermin
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8" role="list">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="listitem"
              aria-current={activeSection === link.id ? "page" : undefined}
              className="relative text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 rounded"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                />
              )}
            </a>
          ))}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            aria-label={themeLabel(themeMode)}
            title={themeMode === "auto" ? "Theme: Auto" : themeMode === "dark" ? "Theme: Dark" : "Theme: Light"}
          >
            {themeIcon(themeMode)}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            aria-label={themeLabel(themeMode)}
            title={themeMode === "auto" ? "Theme: Auto" : themeMode === "dark" ? "Theme: Dark" : "Theme: Light"}
          >
            {themeIcon(themeMode)}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-4"
          >
            <nav aria-label="Mobile navigation">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className="block py-3 text-muted-foreground hover:text-foreground transition-colors border-b border-border last:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
