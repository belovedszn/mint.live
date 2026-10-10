"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
const mask = [".#####.", "#######", "#######", ".######", "..####.", "...###.", "..###..", "..###.."];
const markets: Record<string, { at: [number, number]; note: string }> = {
  Egypt: [5, 0], Ghana: [1, 3], Nigeria: [2, 3], Uganda: [4, 3], Kenya: [5, 3], Rwanda: [4, 4], Tanzania: [5, 4], "South Africa": [3, 7],
} as never;
const info: Record<string, [number, number, string]> = {
  Egypt: [5, 0, "Football, comedy and culture. Large Arabic-language audience."], Ghana: [1, 3, "Music, culture and lifestyle. Mobile money is widely used."],
  Nigeria: [2, 3, "Gaming, music, comedy, football. Largest English-speaking market in the region."], Uganda: [4, 3, "Music, comedy and education."],
  Kenya: [5, 3, "Technology, music and football. Strong mobile payments habits."], Rwanda: [4, 4, "Technology and education. Small, digitally focused market."],
  Tanzania: [5, 4, "Music and culture. Swahili-language audience."], "South Africa": [3, 7, "Gaming, fashion, comedy. Established creator scene."],
};
void markets;
export default function AfricaMap() {
  const [sel, setSel] = useState("Nigeria");
  const at = (c: number, r: number) => Object.entries(info).find(([, v]) => v[0] === c && v[1] === r)?.[0];
  return (
    <section id="africa" className="mx-auto max-w-6xl px-4 py-16">
      <Reveal><h2 className="font-display text-4xl md:text-6xl">Where we could go.</h2><p className="mt-3 max-w-xl text-mute">Target markets only. The platform does not operate in any of them today. Schematic map, not to scale.</p></Reveal>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="mx-auto grid w-full max-w-sm grid-cols-7 gap-1.5">
          {mask.flatMap((row, r) => [...row].map((ch, c) => {
            if (ch !== "#") return <span key={`${r}${c}`} className="aspect-square" />;
            const n = at(c, r);
            return n ? <motion.button key={n} aria-label={`${n}: expansion opportunity`} aria-pressed={sel === n} onMouseEnter={() => setSel(n)} onFocus={() => setSel(n)} onClick={() => setSel(n)} initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className={`aspect-square rounded-sm ${sel === n ? "bg-accent" : "bg-accent/40"}`} />
              : <span key={`${r}${c}`} className="aspect-square rounded-sm bg-surface2" />;
          }))}
        </div>
        <div aria-live="polite" className="border-l-2 border-accent pl-4"><p className="text-xs text-accent">EXPANSION OPPORTUNITY</p><p className="font-display text-3xl">{sel}</p><p className="mt-2 text-mute">{info[sel][2]}</p><p className="mt-6 text-sm text-mute">Beyond these eight: broader continental expansion over time.</p></div>
      </div>
    </section>
  );
}
