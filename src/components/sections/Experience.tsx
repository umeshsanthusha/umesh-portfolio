import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/constants/data";
import { fadeLeft, viewport } from "@/hooks/useScrollAnimation";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="rail">
          <div className="rail-head">
            <SectionHeading
              id="experience-heading"
              title="Experience"
              note="where theory met production"
            />
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-glow/70 via-graphite to-transparent"
            />
            <ol className="space-y-10">
              {experience.map((job, i) => (
                <li key={job.company} className="relative pl-10">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-glow/60 bg-night"
                  >
                    <span className="h-[7px] w-[7px] rounded-full bg-glow shadow-[0_0_10px_2px_rgba(124,156,255,0.65)]" />
                  </span>

                  <motion.article
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    custom={i * 0.08}
                    className="card card-hover p-6 sm:p-8"
                  >
                    <p className="font-serif text-lg italic text-faint">{job.period}</p>
                    <h3 className="mt-1 text-xl font-medium text-glow">{job.role}</h3>
                    <p className="text-mist">{job.company}</p>
                    <ul className="mt-5 space-y-2.5">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-mist">
                          <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-glow/50" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
