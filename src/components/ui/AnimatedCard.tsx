import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/utils/helpers";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  delay = 0,
  className,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.article
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn("card", hover && "card-hover", className)}
    >
      {children}
    </motion.article>
  );
}
