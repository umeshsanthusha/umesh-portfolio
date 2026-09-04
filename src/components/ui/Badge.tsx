import type { IconType } from "react-icons";
import { cn } from "@/utils/helpers";

interface BadgeProps {
  label: string;
  icon?: IconType;
  tone?: "default" | "accent" | "current";
  className?: string;
}

const tones = {
  default:
    "border-glow/20 bg-raised/70 text-mist",
  accent:
    "border-glow/45 bg-glow/10 text-glow",
  current:
    "border-teal-glow/50 bg-teal-glow/10 text-teal-glow",
} as const;

export default function Badge({ label, icon: Icon, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-tiny transition-colors duration-300 hover:border-glow/60 hover:text-paper",
        tones[tone],
        className
      )}
    >
      {Icon ? <Icon aria-hidden="true" className="text-sm" /> : null}
      {label}
    </span>
  );
}
