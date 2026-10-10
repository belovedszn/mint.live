"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { allCreators, categories, tiers } from "@/data/discover";
const tabs = ["Live", "Discover", "Community", "Monetize"] as const;
export default function ProductTabs() {
  const [t, setT] = useState<(typeof tabs)[number]>("Live");
  const [cat, setCat] = useState("All"), [tier, setTier] = useState(1), [tip, setTip] = useState(5000);
  const list = allCreators.filter((c) => cat === "All" || c.category === cat);
  const fee = tip * 0.02, plat = tip * 0.15, cr = tip - fee - plat;
  return (
    <section id="modules" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal><h2 className="max-w-2xl font-display text-4xl md:text-6xl">Built around the way African audiences actually connect.</h2></Reveal>
      <div role="tablist" className="mt-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-sm bg-surface2 p-1">
        {tabs.map((x) => <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className="relative rounded-sm px-4 py-2 text-sm font-medium text-paper">{t === x && <motion.span layoutId="tab" className="absolute inset-0 rounded-sm bg-accent" />}<span className={`relative ${t === x ? "text-ink" : ""}`}>{x}</span></button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={t} role="tabpanel" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }} className="mt-6 min-h-[260px]">
          {t === "Live" && <p className="max-w-xl text-mute">Creators broadcast from a phone with adaptive quality, straight to their community. Chat, follow and subscribe happen in the same room. <a href="#product" className="text-accent underline">Try it in the prototype below.</a></p>}
          {t === "Discover" && <div>
            <div className="flex gap-2 overflow-x-auto pb-2">{categories.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`whitespace-nowrap rounded-sm border px-3 py-1 text-sm ${cat === c ? "border-accent bg-accent text-ink" : "border-line text-mute"}`}>{c}</button>)}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {list.length ? list.map((c) => <motion.div layout key={c.id} className="border border-line p-3"><p className="text-xs text-accent">LIVE · {c.viewers.toLocaleString()}</p><p className="mt-1 text-sm font-medium">{c.title}</p><p className="text-xs text-mute">{c.name} · {c.city}, {c.country}</p></motion.div>) : <p className="text-sm text-mute">No creators in this category in the mock data.</p>}
            </div></div>}
          {t === "Community" && <div className="grid gap-3 md:grid-cols-3">{tiers.map((x, i) => <button key={x.name} onClick={() => setTier(i)} aria-pressed={tier === i} className={`border p-4 text-left ${tier === i ? "border-accent" : "border-line"}`}><p className="font-medium">{x.name}</p><p className="text-accent">{x.price}</p><p className="mt-2 text-sm text-mute">{x.perks}</p></button>)}<p className="text-xs text-mute md:col-span-3">Illustrative tiers and prices.</p></div>}
          {t === "Monetize" && <div className="max-w-xl">
            <label className="text-sm text-mute">A viewer tips NGN <b className="text-paper">{tip.toLocaleString()}</b><input type="range" min={200} max={20000} step={100} value={tip} onChange={(e) => setTip(+e.target.value)} className="mt-2 w-full accent-[#E8A33D]" /></label>
            {[["Creator", cr, "bg-accent"], ["Platform (15%, illustrative)", plat, "bg-accent"], ["Payment partner (2%, illustrative)", fee, "bg-mute"]].map(([l, v, c]) => <div key={l as string} className="mt-3"><div className="flex justify-between text-sm"><span>{l}</span><span>NGN {Math.round(v as number).toLocaleString()}</span></div><motion.div className={`mt-1 h-2 ${c}`} animate={{ width: `${((v as number) / tip) * 100}%` }} /></div>)}
          </div>}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
