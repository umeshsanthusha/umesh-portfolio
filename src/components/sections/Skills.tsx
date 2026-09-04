import type { IconType } from "react-icons";
import { FiFeather } from "react-icons/fi";
import SectionHeading from "@/components/ui/SectionHeading";
import { creativeSkills, technicalSkills } from "@/constants/data";
import { cn } from "@/utils/helpers";

function Chip({ label, icon: Icon, tone }: { label: string; icon?: IconType; tone: "tech" | "creative" }) {
  return (
    <li
      className={cn(
        "inline-flex cursor-default items-center gap-2 rounded-full border px-3.5 py-1.5 text-[15px] transition-all duration-300 hover:-translate-y-0.5",
        tone === "tech"
          ? "border-glow/20 bg-raised/60 text-mist hover:border-glow/60 hover:text-paper hover:shadow-[0_0_18px_-6px_rgba(124,156,255,0.55)]"
          : "border-orchid/30 bg-orchid/5 text-orchid/90 hover:border-orchid/60 hover:text-orchid hover:shadow-[0_0_18px_-6px_rgba(192,132,252,0.5)]"
      )}
    >
      {Icon ? <Icon aria-hidden="true" /> : null}
      {label}
    </li>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="rail">
          <div className="rail-head">
            <SectionHeading
              id="skills-heading"
              title="Skills"
              note="the toolkit, technical and tactile"
            />
          </div>

          <div>
            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {technicalSkills.map((group) => (
                <div key={group.title}>
                  <h3 className="font-serif text-lg italic text-paper">{group.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => (
                      <Chip key={skill.name} label={skill.name} icon={skill.icon} tone="tech" />
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 border-t border-graphite pt-9">
              <h3 className="flex items-center gap-2 font-serif text-lg italic text-orchid">
                <FiFeather aria-hidden="true" />
                {creativeSkills.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2.5">
                {creativeSkills.skills.map((skill) => (
                  <Chip key={skill.name} label={skill.name} tone="creative" />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
