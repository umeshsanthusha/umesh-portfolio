import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { education } from "@/constants/data";
import { viewport } from "@/hooks/useScrollAnimation";

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="rail">
          <div className="rail-head">
            <SectionHeading
              id="education-heading"
              title="Education"
              note="the coursework behind the craft"
            />
          </div>

          <ol className="space-y-6">
            {education.map((entry, i) => (
              <motion.li
                key={entry.qualification}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="card card-hover p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-md border border-glow/30 bg-glow/5 px-3 py-1 text-tiny text-glow">
                    <FiBookOpen aria-hidden="true" />
                    {entry.level}
                  </span>
                  {entry.current ? <Badge label="Current" tone="current" /> : null}
                  <span className="ml-auto font-serif text-base italic text-faint">
                    {entry.period}
                  </span>
                </div>

                <h3 className="mt-3 font-serif text-xl font-medium tracking-tight text-paper">
                  {entry.qualification}
                </h3>
                <p className="mt-1 text-mist">{entry.institution}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-faint">{entry.details}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
