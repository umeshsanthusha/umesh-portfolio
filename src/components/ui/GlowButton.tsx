import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/helpers";

type Variant = "primary" | "ghost";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-glow disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-glow text-night shadow-[0_0_28px_-6px_rgba(124,156,255,0.65)] hover:shadow-[0_0_40px_-4px_rgba(124,156,255,0.85)] hover:-translate-y-0.5",
  ghost:
    "border border-glow/35 text-paper hover:border-glow/80 hover:bg-glow/10 hover:shadow-[0_0_24px_-8px_rgba(124,156,255,0.6)] hover:-translate-y-0.5",
} as const;

export default function GlowButton({
  variant = "primary",
  children,
  className,
  type = "button",
  ...rest
}: GlowButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
