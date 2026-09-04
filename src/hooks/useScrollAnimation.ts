import { useInView } from "react-intersection-observer";
import type { Variants } from "framer-motion";

export const viewport = { once: true, amount: 0.15 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function useScrollAnimation(threshold = 0.15) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });
  return { ref, inView };
}
