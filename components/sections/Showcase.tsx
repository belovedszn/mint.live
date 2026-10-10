"use client";
import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Label } from "@/components/ui/Kit";
import { allCreators } from "@/data/discover";
import type { Creator } from "@/data/mock";
const list = allCreators.slice(0, 6);
const ini = (c: Creator) => c.name.split(" ").map((w) => w[0]).join("");
function Art({ c, meta = 1 }: { c: Creator; meta?: MotionValue<number> | number }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface transition duration-500 group-hover:-translate-y-1.5">
      <div className="absolute inset-0 flex items-center justify-center transition duration-500 group-hover:scale-105"><span className="font-display text-[9rem] text-paper/10">{ini(c)}</span></div>
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex justify-between font-mono text-[10px] tracking-widest"><span className="text-accent">● LIVE</span><span className="text-mute">{c.category.toUpperCase()}</span></div>
        <div>
          <p className="font-display text-5xl text-accent">{c.viewers.toLocaleString()}</p>
          <motion.div style={{ opacity: meta }} className="mt-2"><p className="font-medium">{c.title}</p><p className="font-mono text-[11px] text-mute">{c.name} · {c.city}, {c.country}</p></motion.div>
        </div>
      </div>
    </div>
  );
}
function Card({ c, i, p }: { c: Creator; i: number; p: MotionValue<number> }) {
  const m = i / (list.length - 1);
  const scale = useTransform(p, [m - 0.2, m, m + 0.2], [0.9, 1, 0.9]), opacity = useTransform(p, [m - 0.2, m, m + 0.2], [0.4, 1, 0.4]), meta = useTransform(p, [m - 0.12, m, m + 0.12], [0.35, 1, 0.35]);
  return <motion.a href="#prototype" aria-label={`${c.title}, open prototype`} style={{ scale, opacity }} className="group block w-[min(30vw,40vh)] shrink-0"><Art c={c} meta={meta} /></motion.a>;
}
export default function Showcase() {
  const ref = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null), [dist, setDist] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useEffect(() => { const f = () => track.current && setDist(track.current.scrollWidth - window.innerWidth); f(); window.addEventListener("resize", f); return () => window.removeEventListener("resize", f); }, []);
  const x = useTransform(p, [0, 1], [0, -dist]);
  const head = <div className="px-4 md:px-10"><Label n="01" t="Product" /><h2 className="font-display mt-3 max-w-4xl text-4xl md:text-6xl">Built around the way African audiences actually connect.</h2></div>;
  return (
    <div id="product">
      <section ref={ref} className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-16">
          {head}
          <motion.div ref={track} style={{ x, paddingLeft: "calc(50vw - min(15vw,20vh))", paddingRight: "calc(50vw - min(15vw,20vh))" }} className="flex w-max gap-[2vw]">
            {list.map((c, i) => <Card key={c.id} c={c} i={i} p={p} />)}
          </motion.div>
          <p className="px-10 font-mono text-[11px] tracking-widest text-mute">SCROLL · PROTOTYPE DATA</p>
        </div>
      </section>
      <section className="space-y-6 py-16 md:hidden">
        {head}
        <div className="flex snap-x gap-3 overflow-x-auto px-4 pb-2">{list.map((c) => <a key={c.id} href="#prototype" className="group w-[72vw] shrink-0 snap-center"><Art c={c} /></a>)}</div>
      </section>
    </div>
  );
}
