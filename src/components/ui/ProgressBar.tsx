import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

/**
 * Thin proficiency bar that fills when scrolled into view.
 */
export default function ProgressBar({ value, label, className }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pct = Math.max(0, Math.min(100, value));

  return (
    <div ref={ref} className={className}>
      {label ? (
        <div className="mb-1 flex items-baseline justify-between text-tiny text-mist">
          <span>{label}</span>
          <span aria-hidden="true">{pct}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1 w-full overflow-hidden rounded-full bg-graphite"
      >
        <div
          className="h-full rounded-full bg-glow transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}
