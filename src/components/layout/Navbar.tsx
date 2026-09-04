import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { navLinks, profile } from "@/constants/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn, scrollToSection, scrollToTop } from "@/utils/helpers";
import type { SectionId } from "@/types";

const ids: SectionId[] = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: SectionId) => {
    setOpen(false);
    // wait a tick so the drawer unmounts before scrolling
    window.setTimeout(() => scrollToSection(id), open ? 120 : 0);
  };

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "glass shadow-[0_10px_36px_-18px_rgba(4,7,14,0.9)]" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="flex items-baseline gap-1 font-serif text-xl font-semibold tracking-tight text-paper"
        >
          Umesh Santhusha
          <span className="text-glow">.</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                data-active={active === link.id}
                aria-current={active === link.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.id);
                }}
                className={cn(
                  "navlink text-[15px] text-mist hover:text-paper",
                  active === link.id && "text-glow"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.resumePath}
            download
            className="navlink hidden items-center gap-1.5 rounded-md border border-glow/35 px-4 py-1.5 text-tiny text-paper transition-colors hover:border-glow/70 hover:bg-glow/10 md:inline-flex"
          >
            <FiDownload aria-hidden="true" />
            Download CV
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-glow/25 text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={20} aria-hidden="true" /> : <FiMenu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 flex h-[calc(100dvh-4rem)] flex-col overflow-y-auto bg-night/95 px-8 py-8 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(link.id);
                    }}
                    aria-current={active === link.id ? "true" : undefined}
                    className={cn(
                      "block border-b border-graphite/60 py-4 font-serif text-2xl",
                      active === link.id ? "text-glow italic" : "text-paper"
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={profile.resumePath}
              download
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md border border-glow/40 px-4 py-3 text-paper"
            >
              <FiDownload aria-hidden="true" />
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
