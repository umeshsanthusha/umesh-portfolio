import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { profile, projects, publication } from "@/constants/data";
import { viewport } from "@/hooks/useScrollAnimation";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="rail">
          <div className="rail-head">
            <SectionHeading
              id="projects-heading"
              title="Projects"
              note="built end to end, sketch to ship"
            />
          </div>

          <div>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, i) => (
                <motion.article
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 26 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
                    },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="card card-hover group flex flex-col p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-serif text-base italic text-faint">{project.tagline}</p>
                    {project.featured ? (
                      <span className="shrink-0 rounded-full border border-orchid/40 bg-orchid/10 px-3 py-0.5 text-tiny text-orchid">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-paper">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-mist">{project.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li key={t}>
                        <Badge label={t} />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-5 border-t border-graphite/70 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="navlink inline-flex items-center gap-2 text-[15px] text-mist hover:text-paper"
                    >
                      <FaGithub aria-hidden="true" />
                      Source
                    </a>
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="navlink inline-flex items-center gap-2 text-[15px] text-mist hover:text-paper"
                      >
                        <FiExternalLink aria-hidden="true" />
                        Live demo
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.aside
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="card mt-6 p-6 sm:p-7"
            >
              <p className="font-serif text-base italic text-faint">Research publication</p>
              <h3 className="mt-2 font-serif text-xl text-paper">{publication.title}</h3>
              <p className="mt-2 text-[15px] text-mist">{publication.context}</p>
            </motion.aside>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="navlink mt-8 inline-flex items-center gap-2 text-paper"
            >
              <FaGithub aria-hidden="true" className="text-glow" />
              View all projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
