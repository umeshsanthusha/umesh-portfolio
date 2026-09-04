import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";

interface SectionHeadingProps {
  title: string;
  note?: string;
  className?: string;
  id?: string;
}

/**
 * Left-rail section heading: title + annotation note + aurora rule.
 */
export default function SectionHeading({ title, note, className, id }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn("max-w-xs", className)}
    >
      <h2 id={id} className="text-3xl font-medium tracking-tight text-paper sm:text-4xl">
        {title}
      </h2>
      {note ? <p className="mt-3 text-base italic text-faint">{note}</p> : null}
      <div className="aurora-rule mt-5 w-20" />
    </motion.div>
  );
}
