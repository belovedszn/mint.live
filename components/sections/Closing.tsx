"use client";
import { useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { Counter, Label, Marquee } from "@/components/ui/Kit";
import { roadmap } from "@/data/mock";
import { ease } from "@/lib/motion";

export function CreatorSection() {
  return (
    <section id="creators" className="grid gap-10 px-4 py-28 md:grid-cols-2 md:px-10">
      <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }} whileInView={{ clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.3, ease }} className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
        <motion.div initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} className="absolute inset-0 flex items-center justify-center"><span className="font-display text-[14rem] text-paper/10">TA</span></motion.div>
        <p className="absolute bottom-3 left-3 font-mono text-[10px] tracking-widest text-mute">PORTRAIT PLACEHOLDER · REPLACE WITH CREATOR PHOTOGRAPHY</p>
      </motion.div>
      <div className="flex flex-col justify-center">
        <Reveal><Label n="02" t="Creators" /><h2 className="font-display mt-3 text-5xl md:text-7xl">Tolu Adeyemi</h2><p className="mt-2 text-mute">Lagos, Nigeria · Gaming · fictional creator, prototype data</p></Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6">
          {[["Peak viewers", 4210], ["Followers", 38200], ["Avg watch time (min)", 24], ["Monthly revenue (NGN)", 1730000]].map(([k, v], i) => (
            <Reveal key={k as string} delay={0.1 * i}><p className="font-mono text-[11px] text-mute">{k}</p><p className="font-display text-4xl text-accent md:text-5xl"><Counter to={v as number} /></p></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Audience() {
  return (
    <section id="market" className="px-4 py-28 md:px-10">
      <Reveal><Label n="03c" t="Opportunity" /><h2 className="font-display mt-3 max-w-4xl text-4xl md:text-7xl">The audience is already here.</h2></Reveal>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {["African creators already have audiences on TikTok, YouTube, Instagram, Twitch and Facebook.", "Viewing is mobile-first and data-conscious, so video has to adapt to the network.", "Local payment methods are how people actually pay, so monetization has to meet them there."].map((t, i) => <Reveal key={t} delay={i * 0.1}><p className="border-t border-line pt-3 text-lg">{t}</p></Reveal>)}
      </div>
      <p className="mt-8 font-mono text-[11px] text-mute">MARKET FIGURES WILL BE ADDED WITH NAMED SOURCES AND DATES. NONE ARE SHOWN UNTIL VERIFIED.</p>
    </section>
  );
}
export function Vision() {
  return (
    <section id="vision" className="overflow-hidden py-28">
      <div className="px-4 md:px-10"><Reveal><Label n="08" t="Vision" /><h2 className="font-display mt-3 max-w-5xl text-5xl md:text-8xl">Not just another <span className="font-serif font-normal normal-case italic tracking-normal text-accent">streaming</span> platform.</h2><p className="mt-6 max-w-xl text-mute">A home for African digital creators: go live, build communities, earn, collaborate, find brands and run a business, all in one place.</p></Reveal></div>
      <div className="mt-16 -rotate-2 scale-105 border-y border-line py-4">
        <Marquee items={["GO LIVE", "BUILD COMMUNITIES", "EARN", "COLLABORATE", "FIND BRANDS", "GROW AUDIENCES", "BUILD BUSINESSES"]} speed={34} className="font-display text-5xl md:text-7xl" />
        <Marquee reverse items={["GO LIVE", "BUILD COMMUNITIES", "EARN", "COLLABORATE", "FIND BRANDS", "GROW AUDIENCES", "BUILD BUSINESSES"]} speed={40} className="font-display outline-text text-5xl md:text-7xl" />
      </div>
    </section>
  );
}
function Milestone({ r, i, p }: { r: (typeof roadmap)[number]; i: number; p: MotionValue<number> }) {
  const t = i / 4, o = useTransform(p, [t - 0.12, t], [0.25, 1]), s = useTransform(p, [t - 0.12, t], [0.85, 1]);
  return (
    <motion.li style={{ opacity: o }} className="relative pb-16 pl-8">
      <span className="absolute -left-[5px] top-3 h-2.5 w-2.5 rounded-full bg-accent" />
      <motion.p style={{ scale: s }} className="font-display origin-left text-6xl text-accent md:text-8xl">{r.phase}</motion.p>
      <h3 className="font-display text-3xl md:text-5xl">{r.name}</h3>
      <ul className="mt-3 grid grid-cols-2 gap-1 text-mute">{r.items.map((x) => <li key={x}>{x}</li>)}</ul>
    </motion.li>
  );
}
export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null), { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] }), h = useTransform(p, [0, 1], [0, 1]);
  return (
    <section id="roadmap" className="px-4 py-28 md:px-10">
      <Label n="08b" t="Roadmap" /><h2 className="font-display mt-3 text-4xl md:text-6xl">Where this goes next.</h2>
      <div ref={ref} className="relative mt-12 max-w-3xl">
        <div className="absolute left-0 top-0 h-full w-px bg-line" /><motion.div style={{ scaleY: h }} className="absolute left-0 top-0 h-full w-px origin-top bg-accent" />
        <ol>{roadmap.map((r, i) => <Milestone key={r.phase} r={r} i={i} p={p} />)}</ol>
      </div>
      <p className="font-mono text-[11px] text-mute">NONE OF THESE PHASES HAS HAPPENED YET.</p>
    </section>
  );
}
export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="px-4 pb-16 pt-32 md:px-10">
      <motion.h2 initial={{ opacity: 0, scale: 1.12 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.4, ease }} className="font-display text-center text-[34vw] leading-[0.8] text-paper">kora</motion.h2>
      <Reveal className="text-center"><p className="font-serif text-4xl italic text-accent md:text-6xl">Let&apos;s build this.</p></Reveal>
      <div className="mx-auto mt-16 max-w-2xl">
        <Reveal><h3 className="font-display text-3xl md:text-5xl">Help build the infrastructure for Africa&apos;s next generation of creators.</h3><p className="mt-4 text-mute">Kora is an early-stage concept being prepared for validation and pre-seed funding.</p></Reveal>
        {sent ? <p role="status" className="mt-8 border-l-2 border-accent pl-3">Thanks. This is a showcase, so nothing was sent.</p> : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 space-y-4">
            {["Name", "Email", "Company / Organization"].map((l, i) => <Reveal key={l} delay={i * 0.08}><label className="block text-sm text-mute">{l}<input required={l !== "Company / Organization"} type={l === "Email" ? "email" : "text"} className="mt-1 w-full rounded border border-line bg-surface p-3 text-paper" /></label></Reveal>)}
            <Reveal delay={0.25}><label className="block text-sm text-mute">Message<textarea rows={3} className="mt-1 w-full rounded border border-line bg-surface p-3 text-paper" /></label></Reveal>
            <Reveal delay={0.33}><button className="group inline-flex items-center gap-2 rounded bg-accent px-6 py-3 font-medium text-ink transition duration-300 hover:scale-[1.03]">Talk to the Founders <span aria-hidden className="transition duration-300 group-hover:translate-x-1">→</span></button> <a href="#" className="ml-4 underline underline-offset-4">Join the Waitlist</a></Reveal>
          </form>)}
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="border-t border-line px-4 py-10 md:px-10">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div><p className="font-display text-2xl">kora<span className="text-accent">.</span></p><p className="mt-2 max-w-sm text-sm text-mute">A living visual system for Africa&apos;s creator economy, being built from validation up.</p></div>
        <nav aria-label="Footer" className="flex gap-6 text-sm text-mute">{[["Product", "product"], ["Creators", "creators"], ["Business", "business"], ["Vision", "vision"], ["Contact", "contact"]].map(([l, id]) => <a key={id} href={`#${id}`} className="hover:text-paper">{l}</a>)}</nav>
        <div className="flex gap-4 text-sm text-mute">{["X", "LinkedIn", "Instagram"].map((s) => <a key={s} href="#" aria-label={`${s} (placeholder)`} className="hover:text-paper">{s}</a>)}</div>
      </div>
      <p className="mt-8 font-mono text-[11px] text-mute">KORA IS A CONCEPTUAL PROTOTYPE. ALL CREATORS, METRICS AND REVENUE SHOWN ARE FICTIONAL. NO LIVE PRODUCT, USERS OR TRACTION.</p>
    </footer>
  );
}
