"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/ui/Kit";
import { ease } from "@/lib/motion";
const PATH = "M -100 720 C 260 260, 560 860, 860 540 S 1300 180, 1700 360";
const TXT = "CREATORS · LIVE · COMMUNITY · PAYMENTS · DISCOVERY · AFRICA · KORA · ".repeat(4);
const nodes: [number, number, string][] = [[400, 578, "LAGOS · 4,210 LIVE"], [860, 540, "NAIROBI · 970 LIVE"], [1243, 375, "ACCRA · 1,860 LIVE"]];

function KineticPath({ reduce }: { reduce: boolean | null }) {
  return (
    <svg aria-hidden viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <path id="kp" d={PATH} pathLength={1000} fill="none" stroke="#F2EDE3" strokeOpacity=".16" />
      <text fontSize="20" letterSpacing="7" fill="#F2EDE3" fillOpacity=".4" fontFamily="var(--font-mono), monospace">
        <textPath href="#kp" startOffset="-30%">{!reduce && <animate attributeName="startOffset" from="-30%" to="0%" dur="80s" repeatCount="indefinite" />}{TXT}</textPath>
      </text>
      <path d={PATH} pathLength={1000} fill="none" stroke="#E8A33D" strokeWidth="3" strokeLinecap="round" strokeDasharray="30 970">
        {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-1000" dur="9s" repeatCount="indefinite" />}
      </path>
      {nodes.map(([x, y, l]) => (
        <g key={l}>
          <circle cx={x} cy={y} r="5" fill="#E8A33D" />
          {!reduce && <circle cx={x} cy={y} r="5" fill="none" stroke="#E8A33D"><animate attributeName="r" from="5" to="26" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" from="0.8" to="0" dur="3s" repeatCount="indefinite" /></circle>}
          <text x={x + 14} y={y - 14} fontSize="14" letterSpacing="3" fill="#F2EDE3" fillOpacity=".7" fontFamily="var(--font-mono), monospace">{l}</text>
        </g>
      ))}
      <g transform="translate(900 500)">{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <rect key={i} className="bar" x={i * 9} y={-40} width="5" height="40" fill="#E8A33D" fillOpacity=".8" style={{ animationDelay: `${(i * 137) % 700}ms` }} />)}</g>
    </svg>
  );
}
const Line = ({ d, className, children }: { d: number; className: string; children: React.ReactNode }) => (
  <div className={`overflow-hidden py-[0.06em] ${className}`}><motion.div initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: 0.5 + d }}>{children}</motion.div></div>
);
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null), reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), rotate = useTransform(scrollYProgress, [0, 0.5], [0, 2]), opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.1]);
  return (
    <div ref={ref} className="relative h-[200vh]" style={{ zIndex: 1 }}>
      <motion.section style={reduce ? undefined : { scale, rotate, opacity }} className="sticky top-0 flex h-screen origin-center items-center overflow-hidden bg-ink">
        <div className="absolute inset-0"><KineticPath reduce={reduce} /></div>
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-4 pb-8 pt-20 md:px-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-between font-mono text-[11px] tracking-[0.2em] text-mute"><span>KORA / EARLY-STAGE CONCEPT</span><span className="hidden sm:inline">LAGOS · NAIROBI · ACCRA</span></motion.div>
          <h1 className="font-display">
            <Line d={0.1} className="text-[9vw] md:text-[6.5vw]">Where Africa&apos;s</Line>
            <Line d={0.2} className="text-[17vw] md:text-[15vw]">Creators</Line>
            <Line d={0.3} className="text-right text-[17vw] md:text-[15vw]"><span className="font-serif font-normal normal-case italic tracking-normal text-accent">go live.</span></Line>
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3, ease }} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-md text-mute">Kora is being designed as a dedicated place for African creators to go live, build communities and get paid locally. This is a prototype, not a live product.</p>
            <div className="flex items-center gap-6">
              <Magnetic><a href="#product" className="inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-medium text-ink">See the Product <span aria-hidden>→</span></a></Magnetic>
              <a href="#why-now" className="underline underline-offset-4">Why Kora</a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
