import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile, quickStats } from "@/constants/data";
import { fadeLeft, fadeRight, viewport } from "@/hooks/useScrollAnimation";
import portrait from "@/assets/hero.png";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="rail">
          <div className="rail-head">
            <SectionHeading id="about-heading" title="About" note="the person behind the cursor" />
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <motion.figure
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="photo-frame mx-auto w-full max-w-sm lg:mx-0"
            >
              <img
                src={portrait}
                alt="Portrait of Umesh Santhusha"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.figure>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={viewport}>
              <p className="text-lg leading-relaxed text-paper/90">
                I’m a highly motivated IT student and UI/UX developer with a strong foundation in
                IT systems, frontend development, and creative design. I build responsive,
                user-centric web applications — and I care as much about how an interface feels
                as how it works.
              </p>
              <p className="mt-5 leading-relaxed text-mist">
                My path runs through real-time ERP systems, database management, and network
                troubleshooting — and alongside the code, a pencil. Sketching taught me
                composition, restraint, and attention to detail; development taught me to ship.
                The two meet in every interface I craft.
              </p>

              <dl className="mt-9 grid grid-cols-2 gap-3">
                {quickStats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="card card-hover p-4">
                    <Icon aria-hidden="true" className="text-glow" />
                    <dt className="mt-2 text-sm leading-snug text-mist">{label}</dt>
                    <dd className="font-serif text-lg text-paper">{value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={profile.resumePath}
                download
                className="navlink mt-8 inline-flex items-center gap-2 text-paper"
              >
                <FiDownload aria-hidden="true" className="text-glow" />
                Download full CV (PDF)
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
