"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { spring } from "@/lib/motion";
const links = [["Product", "Explore it", "product"], ["Creators", "Meet the people", "creators"], ["Why Now", "See the gap", "why-now"], ["Business Model", "Follow the money", "business"], ["Scale", "See the map", "africa"], ["Vision", "Read the plan", "vision"], ["Contact", "Talk to us", "contact"]] as const;
function Flip({ a, b, id, close }: { a: string; b: string; id: string; close: () => void }) {
  const [h, setH] = useState(false);
  return (
    <a href={`#${id}`} onClick={close} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} onFocus={() => setH(true)} onBlur={() => setH(false)} className="relative block h-10 overflow-hidden" style={{ perspective: 400 }}>
      <motion.span className="font-display block text-2xl" animate={{ rotateX: h ? -90 : 0, opacity: h ? 0 : 1 }} transition={{ duration: 0.3 }}>{a}</motion.span>
      <motion.span className="absolute inset-0 block font-serif text-2xl italic text-accent" animate={{ rotateX: h ? 0 : 90, opacity: h ? 1 : 0 }} transition={{ duration: 0.3 }}>{b}</motion.span>
    </a>
  );
}
export default function Nav() {
  const [open, setOpen] = useState(false), [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((l) => { const el = document.getElementById(l[2]); if (el) io.observe(el); });
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { io.disconnect(); window.removeEventListener("keydown", k); };
  }, []);
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3">
        <motion.nav layout transition={spring} style={{ borderRadius: 12 }} aria-label="Main" className="pointer-events-auto w-full max-w-[420px] overflow-hidden border border-line bg-ink/80 backdrop-blur-md sm:w-auto sm:min-w-[320px]">
          <motion.div layout="position" className="flex items-center justify-between gap-6 px-4 py-2.5">
            <a href="#" className="font-display text-lg">kora<span className="text-accent">.</span></a>
            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden rounded bg-accent px-3 py-1.5 text-xs font-medium text-ink sm:inline">Join the Waitlist</a>
              <button aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)} className="font-mono text-xs tracking-widest">{open ? "CLOSE" : "MENU"}</button>
            </div>
          </motion.div>
          <AnimatePresence>
            {open && (
              <motion.ul id="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 pb-4">
                {links.map(([a, b, id]) => <li key={id}><Flip a={a} b={b} id={id} close={() => setOpen(false)} /></li>)}
                <li className="pt-3 sm:hidden"><a href="#contact" onClick={() => setOpen(false)} className="inline-block rounded bg-accent px-4 py-2 text-sm font-medium text-ink">Join the Waitlist</a></li>
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
      <ol aria-label="Page progress" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {links.map(([a, , id], i) => (
          <li key={id}><a href={`#${id}`} className={`flex items-center justify-end gap-2 font-mono text-[10px] tracking-widest transition-colors ${active === id ? "text-accent" : "text-mute"}`}>
            {active === id && <span>{a.toUpperCase()}</span>}<span>0{i + 1}</span><span className={`h-px transition-all duration-500 ${active === id ? "w-6 bg-accent" : "w-2 bg-line"}`} />
          </a></li>
        ))}
      </ol>
    </>
  );
}
