"use client";
import { useState, useEffect, useRef } from "react";

interface Props {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  color?: string;
}

export default function StatCard({ value, suffix = "", label, icon, color = "primary" }: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [started, value]);

  const bg: Record<string, string> = {
    primary: "bg-primary/10 text-primary-light border-primary/20",
    accent:  "bg-accent/10 text-accent-light border-accent/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <div ref={ref} className="glass-hover p-6 rounded-2xl text-center group">
      <div className={`inline-flex p-3 rounded-xl border mb-4 ${bg[color]}`}>{icon}</div>
      <div className="text-4xl font-black text-ink mb-1">
        {count}{suffix}
      </div>
      <div className="text-ink-muted text-sm font-medium">{label}</div>
    </div>
  );
}
