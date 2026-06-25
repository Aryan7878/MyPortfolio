import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono font-medium text-sm text-primary tracking-wider hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm"
          aria-label="Aryan Chaudhary — Home"
        >
          Aryan Chaudhary
        </Link>

        {/* Desktop Nav */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 py-1.5 text-sm rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary hover:bg-surface"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {!isHome && (
            <Link
              to="/"
              className="px-3.5 py-1.5 text-sm text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
            >
              ← Back
            </Link>
          )}
          <a
            href="/Aryan_Chaudhary_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume (opens in new tab)"
            className="px-3.5 py-1.5 text-sm border border-border text-primary rounded-md hover:border-border-hover hover:bg-surface transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden flex flex-col gap-1.5 p-2 text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block h-px w-5 bg-current transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {isHome &&
                navLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="px-3 py-2.5 text-sm text-secondary hover:text-primary transition-colors rounded-md hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {link.label}
                    </a>
                  );
                })}
              {!isHome && (
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm text-secondary hover:text-primary transition-colors rounded-md hover:bg-surface"
                >
                  ← Back to Home
                </Link>
              )}
              <div className="mt-2 pt-2 border-t border-border">
                <a
                  href="/Aryan_Chaudhary_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 text-sm text-primary hover:bg-surface rounded-md transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
