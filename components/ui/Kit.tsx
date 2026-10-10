"use client";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ease } from "@/lib/motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const l = new Lenis({ duration: 1.15, wheelMultiplier: 0.9, touchMultiplier: 1.5, anchors: true });
    let id = requestAnimationFrame(function raf(t) { l.raf(t); id = requestAnimationFrame(raf); });
    return () => { cancelAnimationFrame(id); l.destroy(); };
  }, [reduce]);
  return <>{children}</>;
}
export const Label = ({ n, t }: { n: string; t: string }) => <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{n} / {t}</p>;
export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null), seen = useInView(ref, { once: true, amount: 0.6 }), reduce = useReducedMotion(), [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduce) { setV(to); return; }
    const c = animate(0, to as number, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (x: number) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, to, reduce]);
  return <span ref={ref} className="tabular-nums">{v.toLocaleString("en-NG")}</span>;
}
export function Marquee({ items, reverse, speed = 26, className = "" }: { items: string[]; reverse?: boolean; speed?: number; className?: string }) {
  return (
    <div className="overflow-hidden" aria-hidden>
      <div className={`flex w-max whitespace-nowrap ${reverse ? "mq-r" : "mq"}`} style={{ animationDuration: `${speed}s` }}>
        {[...items, ...items].map((t, i) => <span key={i} className={className}>{t}<span className="mx-6 text-accent md:mx-10">—</span></span>)}
      </div>
    </div>
  );
}
export function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0), sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}
