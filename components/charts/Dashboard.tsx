"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { audience, dash, recent } from "@/data/discover";
function Count({ to }: { to: number }) {
  const ref = useRef<HTMLParagraphElement>(null), seen = useInView(ref, { once: true }), [v, setV] = useState(0);
  useEffect(() => { if (!seen) return; const c = animate(0, to, { duration: 1.2, onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop(); }, [to, seen]);
  return <p ref={ref} className="font-display text-2xl tabular-nums text-accent">{v.toLocaleString("en-NG")}</p>;
}
export default function Dashboard() {
  const [r, setR] = useState("7 days"); const d = dash[r]; const max = Math.max(...d.series);
  return (
    <section id="dashboard" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal><h2 className="font-display text-4xl md:text-6xl">What a creator sees.</h2><p className="mt-3 max-w-xl text-mute">Fictional data for Tolu Adeyemi. Switch the range and the numbers and chart update.</p></Reveal>
      <div className="mt-6 flex gap-2">{Object.keys(dash).map((k) => <button key={k} aria-pressed={r === k} onClick={() => setR(k)} className={`rounded-sm border px-3 py-1 text-sm ${r === k ? "border-accent bg-accent text-ink" : "border-line text-mute"}`}>{k}</button>)}</div>
      <div key={r} className="mt-4 grid grid-cols-2 gap-px bg-line md:grid-cols-4">{d.kpis.map(([k, v]) => <div key={k} className="bg-surface p-4"><p className="text-xs text-mute">{k}</p><Count to={v} /></div>)}</div>
      <div className="mt-4 grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="border border-line p-4"><p className="text-xs text-mute">Peak viewers per stream</p>
          <div role="img" aria-label="Bar chart of peak viewers" className="mt-3 flex h-40 items-end gap-1.5">{d.series.map((v, i) => <motion.div key={r + i} className="flex-1 bg-accent" initial={{ height: 0 }} whileInView={{ height: `${(v / max) * 100}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5 }} />)}</div></div>
        <div className="border border-line p-4"><p className="text-xs text-mute">Audience locations</p>
          {audience.map(([c, p], i) => <div key={c} className="mt-3"><div className="flex justify-between text-sm"><span>{c}</span><span>{p}%</span></div><motion.div className="mt-1 h-1.5 bg-accent" initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} /></div>)}</div>
      </div>
      <ul className="mt-4 border border-line text-sm">{recent.map(([n, t, e]) => <li key={n} className="flex justify-between border-b border-line p-3 last:border-0"><span>{n}</span><span className="text-mute">{t} · {e}</span></li>)}</ul>
    </section>
  );
}
