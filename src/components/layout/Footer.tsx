import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp, FiMail } from "react-icons/fi";
import { navLinks, profile } from "@/constants/data";
import { scrollToSection, scrollToTop } from "@/utils/helpers";

const socials = [
  { label: "GitHub", href: profile.github, icon: FaGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface/60">
      <div className="footer-seam" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-center font-serif text-2xl font-medium tracking-tight text-paper">
          Umesh Santhusha<span className="text-glow">.</span>
        </p>

        <nav aria-label="Footer" className="mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {["home", "about", "projects", "contact"].map((id) => {
              const link = navLinks.find((l) => l.id === id);
              if (!link) return null;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className="text-tiny text-mist transition-colors hover:text-glow"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <ul className="mt-6 flex items-center justify-center gap-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-graphite text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-glow/60 hover:text-glow"
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-tiny text-faint">
          © {new Date().getFullYear()} Umesh Santhusha. Designed &amp; built with{" "}
          <span aria-label="love" className="text-orchid">
            ♥
          </span>{" "}
          in Matara, Sri Lanka.
        </p>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-glow/30 bg-raised/90 text-mist shadow-[0_8px_28px_-10px_rgba(4,7,14,0.9)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-glow/70 hover:text-glow"
      >
        <FiArrowUp aria-hidden="true" />
      </button>
    </footer>
  );
}
