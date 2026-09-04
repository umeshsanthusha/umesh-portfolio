import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowDown, FiMail } from "react-icons/fi";
import GlowButton from "@/components/ui/GlowButton";
import { profile } from "@/constants/data";
import { useTypewriter } from "@/hooks/useTypewriter";
import { scrollToSection } from "@/utils/helpers";

const HeroCanvas = lazy(() => import("@/components/three/HeroCanvas"));

const socials = [
  { label: "GitHub", href: profile.github, icon: FaGithub },
  { label: "LinkedIn", href: profile.linkedin, icon: FaLinkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: FiMail },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      {/* gradient wash behind canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_72%_42%,rgba(124,156,255,0.14),transparent_65%),radial-gradient(ellipse_45%_40%_at_18%_78%,rgba(94,234,212,0.08),transparent_60%),radial-gradient(ellipse_40%_35%_at_85%_85%,rgba(192,132,252,0.07),transparent_60%)]"
      />
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8"
      >
        <motion.p variants={item} className="font-serif text-xl italic text-mist">
          {profile.greeting}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 max-w-4xl font-serif text-5xl font-semibold leading-[1.04] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Umesh
          <br />
          <span className="font-light text-glow">Santhusha</span>
        </motion.h1>

        <motion.p
          variants={item}
          aria-label={profile.roles.join(", ")}
          className="mt-6 min-h-9 font-serif text-2xl italic text-teal-glow sm:text-3xl"
        >
          <span aria-hidden="true">
            {typed}
            <span className="type-caret" />
          </span>
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-lg leading-relaxed text-mist"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
          <GlowButton variant="primary" onClick={() => scrollToSection("projects")}>
            View my work
          </GlowButton>
          <GlowButton variant="ghost" onClick={() => scrollToSection("contact")}>
            Contact me
          </GlowButton>
        </motion.div>

        <motion.ul variants={item} className="mt-10 flex items-center gap-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-graphite text-mist transition-all duration-300 hover:-translate-y-1 hover:border-glow/60 hover:text-glow hover:shadow-[0_0_22px_-6px_rgba(124,156,255,0.7)]"
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <button
        type="button"
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 p-2 text-mist transition-colors hover:text-glow"
      >
        <FiArrowDown size={22} aria-hidden="true" className="scroll-drift" />
      </button>
    </section>
  );
}
