"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Counter, Label } from "@/components/ui/Kit";
import { ease } from "@/lib/motion";

function useScene() { const ref = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] }); return { ref, p: scrollYProgress }; }
function useIndex(p: MotionValue<number>, f: (v: number) => number, max: number) {
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => { const k = Math.max(0, Math.min(max, f(v))); setI((o) => (o === k ? o : k)); });
  return i;
}

/* WHY NOW: audiences scatter, then converge into one home */
const problems = [["Fragmented audiences", "Creators build communities across several platforms with no dedicated home."], ["Limited monetization", "Attention rarely converts into predictable income."], ["Discovery", "Emerging creators get buried by algorithms tuned for global markets."], ["Payments", "Bank transfer, USSD and mobile money are often an afterthought."], ["Connectivity", "Data costs and patchy networks call for adaptive streaming."]];
const chips: [string, number, number][] = [["TikTok", -34, -26], ["YouTube", 28, -30], ["Instagram", -36, 8], ["Twitch", 34, 12], ["Facebook", -18, 32], ["X", 20, 32], ["WhatsApp", 2, -36]];
function Chip({ n, x, y, p }: { n: string; x: number; y: number; p: MotionValue<number> }) {
  const tx = useTransform(p, [0, 0.5, 0.85], [`${x * 0.3}vw`, `${x}vw`, "0vw"]), ty = useTransform(p, [0, 0.5, 0.85], [`${y * 0.3}vh`, `${y}vh`, "0vh"]), o = useTransform(p, [0.7, 0.9], [1, 0]);
  return <motion.span style={{ x: tx, y: ty, opacity: o }} className="absolute left-1/2 top-1/2 -ml-12 -mt-4 border border-line bg-surface px-3 py-1.5 font-mono text-xs">{n}</motion.span>;
}
export function WhyNow() {
  const { ref, p } = useScene(), i = useIndex(p, (v) => Math.floor(v * 5), 4), core = useTransform(p, [0.6, 0.9], [0, 1]);
  return (
    <section id="why-now" ref={ref} className="relative h-[450vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-4 top-24 md:left-10"><Label n="03" t="Why now" /></div>
        {chips.map(([n, x, y]) => <Chip key={n} n={n} x={x} y={y} p={p} />)}
        <motion.div style={{ opacity: core, scale: core }} className="absolute left-1/2 top-1/2 -ml-28 -mt-20 flex h-40 w-56 flex-col justify-between border border-accent bg-surface p-4"><span className="font-mono text-[10px] text-accent">● KORA</span><span className="font-display text-3xl">One home for the audience</span></motion.div>
        <div className="absolute inset-x-4 bottom-10 md:inset-x-10">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease }}>
              <p className="font-mono text-xs text-accent">0{i + 1} / 05</p>
              <h2 className="font-display text-4xl md:text-7xl">{problems[i][0]}</h2>
              <p className="mt-2 max-w-md text-mute">{problems[i][1]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* GROWTH LOOP: orbital, nodes and arcs activate with scroll */
const steps = [["Creator", "Signs up and sets up a channel."], ["Go Live", "Streams from a phone; quality adapts to the network."], ["Discover", "Viewers find them by country and category."], ["Community", "Chat, follows and memberships."], ["Monetize", "Subscriptions, tips, gifts and sponsors, paid out locally."], ["Grow", "Earnings fund better streams and the audience compounds."]];
const pt = (i: number): [number, number] => { const a = ((-90 + 60 * i) * Math.PI) / 180; return [250 + 150 * Math.cos(a), 250 + 150 * Math.sin(a)]; };
const tOf = (i: number) => 0.04 + i * 0.15;
function LoopNode({ i, p }: { i: number; p: MotionValue<number> }) {
  const [x, y] = pt(i), [x2, y2] = pt((i + 1) % 6), t = tOf(i);
  const o = useTransform(p, [t - 0.05, t], [0, 1]), len = useTransform(p, [t, t + 0.13], [0, 1]), q = useTransform(p, [t + 0.15, t + 0.3], [1, 0.45]);
  const dx = (x - 250) * 0.3, dy = (y - 250) * 0.3;
  return (
    <>
      <motion.path d={`M ${x} ${y} A 150 150 0 0 1 ${x2} ${y2}`} fill="none" stroke="#E8A33D" strokeWidth="2" style={{ pathLength: len }} />
      <motion.g style={{ opacity: o }}><motion.g style={{ opacity: q }}>
        <circle cx={x} cy={y} r="9" fill="#0B0B0A" stroke="#E8A33D" strokeWidth="2" />
        <text x={x + dx} y={y + dy + 5} textAnchor="middle" fill="#F2EDE3" fontSize="16" fontWeight="600">{steps[i][0]}</text>
      </motion.g></motion.g>
    </>
  );
}
export function GrowthLoop() {
  const { ref, p } = useScene(), i = useIndex(p, (v) => Math.floor((v - 0.02) / 0.15), 5);
  return (
    <section id="loop" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 grid h-screen items-center gap-6 overflow-hidden px-4 pt-16 md:grid-cols-2 md:px-10">
        <div>
          <Label n="03b" t="The loop" />
          <h2 className="font-display mt-3 text-4xl md:text-6xl">One loop, built for growth.</h2>
          <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="mt-6">
            <p className="font-serif text-4xl italic text-accent">{steps[i][0]}</p><p className="mt-1 max-w-sm text-mute">{steps[i][1]}</p>
          </motion.div></AnimatePresence>
        </div>
        <svg viewBox="0 0 500 500" role="img" aria-label="Growth loop: Creator, Go Live, Discover, Community, Monetize, Grow, then back to Creator" className="mx-auto w-full max-w-[520px]">
          <circle cx="250" cy="250" r="150" fill="none" stroke="#2A2927" />
          {steps.map((_, k) => <LoopNode key={k} i={k} p={p} />)}
          <text x="250" y="256" textAnchor="middle" fill="#8D8A82" fontSize="12" letterSpacing="4" fontFamily="var(--font-mono), monospace">LOOP</text>
        </svg>
      </div>
    </section>
  );
}

/* BUSINESS: a value signal travels viewer to creator wallet */
const xs = [70, 290, 510, 730], flow = [["Viewer pays", "A tip, subscription or gift, by card, bank transfer, USSD or mobile money."], ["Payment partner", "Processes the payment and takes a processing fee."], ["Kora platform fee", "Kora keeps a share to run video, moderation and support."], ["Creator wallet", "The rest lands with the creator."]];
function FlowNode({ x, k, p }: { x: number; k: number; p: MotionValue<number> }) {
  const t = k / 3, fill = useTransform(p, [t - 0.05, t], ["#0B0B0A", k === 3 ? "#E8A33D" : "#F2EDE3"]), r = useTransform(p, [0.85, 1], [14, k === 3 ? 22 : 14]);
  return <><motion.circle cx={x} cy="60" r={r} stroke="#E8A33D" strokeWidth="2" style={{ fill }} /><text x={x} y="112" textAnchor="middle" fill="#F2EDE3" fontSize="15">{flow[k][0]}</text></>;
}
export function Business() {
  const ref = useRef<HTMLElement>(null), { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.7", "end 0.55"] });
  const cx = useTransform(p, [0, 1], [70, 730]), len = useTransform(p, [0, 1], [0, 1]);
  return (
    <section id="business" ref={ref} className="px-4 py-28 md:px-10">
      <Label n="04" t="Business model" /><h2 className="font-display mt-3 max-w-3xl text-4xl md:text-6xl">How attention becomes income.</h2>
      <svg viewBox="0 0 800 130" role="img" aria-label="Viewer pays, payment partner, Kora platform fee, creator wallet" className="mt-12 w-full">
        <path d="M70 60 H730" stroke="#2A2927" strokeWidth="2" /><motion.path d="M70 60 H730" stroke="#E8A33D" strokeWidth="2" style={{ pathLength: len }} />
        {xs.map((x, k) => <FlowNode key={k} x={x} k={k} p={p} />)}
        <motion.circle cx={cx} cy="60" r="5" fill="#E8A33D" />
      </svg>
      <div className="mt-8 grid gap-6 md:grid-cols-4">{flow.map(([a, b]) => <div key={a} className="border-t border-line pt-3"><p className="font-medium">{a}</p><p className="text-sm text-mute">{b}</p></div>)}</div>
      <p className="mt-10 font-serif text-3xl italic md:text-5xl">A NGN 5,000 tip reaches the creator as about NGN <span className="text-accent"><Counter to={4150} /></span>.</p>
      <p className="mt-2 font-mono text-[11px] text-mute">ILLUSTRATIVE ONLY: 15% PLATFORM, 2% PAYMENT PARTNER. FEES ARE NOT FINAL.</p>
    </section>
  );
}

/* INFRASTRUCTURE: a slow signal lights each node; both systems link */
function Pipeline({ title, nodes }: { title: string; nodes: string[] }) {
  const ref = useRef<HTMLDivElement>(null), seen = useInView(ref, { amount: 0.4 }), reduce = useReducedMotion(), [a, setA] = useState(0);
  useEffect(() => { if (!seen || reduce) return; const t = setInterval(() => setA((x) => (x + 1) % nodes.length), 1300); return () => clearInterval(t); }, [seen, reduce, nodes.length]);
  return (
    <div ref={ref}>
      <p className="font-mono text-[11px] tracking-widest text-mute">{title}</p>
      <ol className="mt-4 border-l border-line pl-6">
        {nodes.map((n, i) => (
          <li key={n} className={`relative py-3 text-xl transition-colors duration-500 ${a === i ? "text-paper" : "text-mute"}`}>
            <span className={`absolute -left-[31px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border transition-colors duration-500 ${a === i ? "border-accent bg-accent" : "border-line bg-ink"}`} />{n}
          </li>
        ))}
      </ol>
    </div>
  );
}
export function Infra() {
  return (
    <section id="infra" className="px-4 py-28 md:px-10">
      <Label n="05" t="Infrastructure" /><h2 className="font-display mt-3 max-w-3xl text-4xl md:text-6xl">A consumer product on top of an infrastructure layer.</h2>
      <p className="mt-4 max-w-xl text-mute">Target architecture, not built yet: regional ingest, adaptive bitrate, CDN delivery, local payments, recommendations and real-time chat.</p>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
        <Pipeline title="VIDEO PATH" nodes={["Creator", "Regional ingest", "Video processing", "CDN", "Viewer"]} />
        <div className="hidden w-24 md:block"><motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className="h-px origin-left bg-accent" /></div>
        <Pipeline title="PRODUCT LOOP" nodes={["Viewer", "Discovery", "Creator", "Community", "Monetization"]} />
      </div>
    </section>
  );
}

/* SCALE: one creator becomes a continental network */
const N = 60;
const net = Array.from({ length: N }, (_, i) => { const a = i * 2.39996, r = i === 0 ? 0 : 16 + Math.sqrt(i) * 29; return { x: 400 + Math.cos(a) * r * 1.5, y: 250 + Math.sin(a) * r, t: (i / N) * 0.85 }; });
const parent = net.map((n, i) => { if (!i) return -1; let b = 0, bd = 1e9; for (let j = 0; j < i; j++) { const d = (n.x - net[j].x) ** 2 + (n.y - net[j].y) ** 2; if (d < bd) { bd = d; b = j; } } return b; });
function NetNode({ i, p }: { i: number; p: MotionValue<number> }) {
  const n = net[i], o = useTransform(p, [n.t, n.t + 0.04], [0, 1]), par = parent[i] >= 0 ? net[parent[i]] : null;
  return <>{par && <motion.line x1={par.x} y1={par.y} x2={n.x} y2={n.y} stroke="#8D8A82" strokeOpacity=".5" style={{ opacity: o }} />}<motion.circle cx={n.x} cy={n.y} r={i === 0 ? 8 : i < 8 ? 5 : 3} fill="#E8A33D" style={{ opacity: o }} /></>;
}
const stages = ["One creator", "A community", "Many creators", "Many cities", "Many markets", "A continental network"], cuts = [0.06, 0.2, 0.4, 0.6, 0.8];
export function Scale() {
  const { ref, p } = useScene(), i = useIndex(p, (v) => cuts.filter((c) => v > c).length, 5);
  return (
    <section id="network" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-4 pb-10 pt-24 md:px-10">
        <Label n="07" t="Scale" />
        <svg viewBox="0 0 800 500" aria-hidden className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-5xl -translate-y-1/2">{net.map((_, k) => <NetNode key={k} i={k} p={p} />)}</svg>
        <h2 className="font-display relative text-4xl md:text-7xl" aria-live="polite">{stages[i]}</h2>
      </div>
    </section>
  );
}
