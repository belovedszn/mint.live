"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { creators, seedChat, payMethods, type Creator, type ChatMsg } from "@/data/mock";

type Role = "viewer" | "creator";
const fmt = (n: number) => n.toLocaleString("en-NG");
const Live = () => <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" />LIVE</span>;
const Btn = (p: React.ButtonHTMLAttributes<HTMLButtonElement> & { solid?: boolean }) => {
  const { solid, className = "", ...r } = p;
  return <button {...r} className={`rounded-sm px-4 py-2 text-sm font-medium transition active:scale-95 ${solid ? "bg-accent text-ink hover:brightness-110" : "border border-paper/30 bg-surface"} ${className}`} />;
};

export default function Prototype() {
  const [role, setRole] = useState<Role>("viewer");
  const [screen, setScreen] = useState<"home" | "room" | "live">("home");
  const [sel, setSel] = useState<Creator>(creators[0]);
  const [followed, setFollowed] = useState(false);
  const [sub, setSub] = useState(false);
  const [paying, setPaying] = useState(false);
  const [chat, setChat] = useState<ChatMsg[]>(seedChat.slice(0, 3));
  const [draft, setDraft] = useState("");
  const [viewers, setViewers] = useState(0);
  const [earn, setEarn] = useState(0);
  const [tick, setTick] = useState(0);

  const active = screen === "room" || screen === "live";
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setViewers((v) => v + Math.floor(Math.random() * 12));
      setChat((c) => [...c.slice(-30), seedChat[Math.floor(Math.random() * seedChat.length)]]);
      if (screen === "live") setEarn((e) => e + 500 * Math.ceil(Math.random() * 4));
    }, 2200);
    return () => clearInterval(id);
  }, [active, screen]);

  const reset = (r: Role) => { setRole(r); setScreen("home"); setFollowed(false); setSub(false); setEarn(0); setPaying(false); };
  const enter = (c: Creator) => { setSel(c); setViewers(c.viewers); setScreen("room"); };
  const goLive = () => { setViewers(0); setEarn(0); setScreen("live"); };
  const send = () => { if (draft.trim()) { setChat((c) => [...c, { user: "you", text: draft }]); setDraft(""); } };

  const hint =
    role === "viewer"
      ? screen === "home" ? "1/4 Pick a live stream to enter its room." : !followed ? "2/4 Follow the creator, or say something in chat." : !sub ? "3/4 Subscribe and choose a local payment method." : "4/4 Done. Switch to the creator side to see where that money lands."
      : screen === "home" ? "1/3 Set up your stream, then go live." : "2/3 Watch viewers and earnings update in real time. 3/3 Tips and subscriptions land in your wallet.";

  return (
    <section id="prototype" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-4xl md:text-6xl">Click through the product.</h2>
      <p className="mt-3 max-w-xl text-mute">Prototype with mock data. Pick a side and follow the guide.</p>
      <div role="tablist" className="mt-6 inline-flex rounded-sm border border-line p-1">
        {(["viewer", "creator"] as Role[]).map((r) => (
          <button key={r} role="tab" aria-selected={role === r} onClick={() => reset(r)} className={`rounded-sm px-4 py-1.5 text-sm capitalize ${role === r ? "bg-accent text-ink" : "text-mute"}`}>I&apos;m a {r}</button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 border-l-2 border-accent pl-3 text-sm">{hint}</p>

      <div className="relative mt-4 min-h-[480px] overflow-hidden rounded-md bg-surface2 p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div key={role + screen} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {role === "viewer" && screen === "home" && (
              <div className="grid gap-3 sm:grid-cols-2">
                {creators.map((c) => (
                  <button key={c.id} onClick={() => enter(c)} className="group rounded-sm border border-line p-4 text-left hover:border-accent">
                    <div className="flex h-28 items-end justify-between bg-surface p-3"><Live /><span className="text-xs text-mute">{fmt(c.viewers)} watching</span></div>
                    <p className="mt-3 font-medium group-hover:text-accent">{c.title}</p>
                    <p className="text-sm text-mute">{c.name} · {c.city}, {c.country} · {c.category}</p>
                  </button>
                ))}
              </div>
            )}
            {role === "viewer" && screen === "room" && (
              <div className="grid gap-4 md:grid-cols-[1fr_300px]">
                <div>
                  <div className="flex aspect-video items-center justify-center bg-surface text-sm text-mute">Video placeholder (prototype)</div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div><Live /> <span className="text-sm text-mute">{fmt(viewers)} watching</span>
                      <p className="font-medium">{sel.title}</p><p className="text-sm text-mute">{sel.name} · {sel.city} · {fmt(sel.followers + (followed ? 1 : 0))} followers</p></div>
                    <div className="flex gap-2">
                      <Btn onClick={() => setFollowed(!followed)} aria-pressed={followed}>{followed ? "Following" : "Follow"}</Btn>
                      <Btn solid disabled={sub} onClick={() => setPaying(true)}>{sub ? "Subscribed" : "Subscribe"}</Btn>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 overflow-x-auto text-sm">{creators.filter((c) => c.id !== sel.id).map((c) => <Btn key={c.id} onClick={() => enter(c)} className="whitespace-nowrap">{c.handle}</Btn>)}</div>
                </div>
                <div className="flex h-80 flex-col border border-line md:h-auto">
                  <ul className="flex-1 space-y-1 overflow-y-auto p-3 text-sm" aria-label="Live chat">{chat.slice(-12).map((m, i) => <li key={i}><b className={m.user === "you" ? "text-accent" : "text-mute"}>{m.user}</b> {m.text}</li>)}</ul>
                  <div className="flex border-t border-line"><input aria-label="Chat message" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Say something" className="min-w-0 flex-1 bg-transparent p-3 text-sm" /><Btn onClick={send} className="border-0">Send</Btn></div>
                </div>
              </div>
            )}
            {role === "creator" && screen === "home" && (
              <div className="max-w-md space-y-3">
                <label className="block text-sm text-mute">Stream title<input defaultValue="Friday night freestyle session" className="mt-1 w-full border border-line bg-surface p-3 text-paper rounded" /></label>
                <label className="block text-sm text-mute">Category<select className="mt-1 w-full border border-line bg-surface p-2 text-paper"><option>Music</option><option>Gaming</option><option>Comedy</option></select></label>
                <p className="text-sm text-mute">Ingest: Lagos region · Adaptive quality on</p>
                <Btn solid onClick={goLive}>Go live</Btn>
              </div>
            )}
            {role === "creator" && screen === "live" && (
              <div>
                <Live />
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[["Viewers", fmt(viewers)], ["Earnings (NGN)", fmt(earn)], ["New followers", String(Math.floor(tick * 1.5))], ["Chat msgs/min", String(20 + (tick % 7))]].map(([k, v]) => (
                    <div key={k} className="border border-line p-3"><p className="text-xs text-mute">{k}</p><p className="font-display text-2xl text-accent tabular-nums">{v}</p></div>))}
                </div>
                <ul className="mt-4 space-y-1 text-sm" aria-label="Chat">{chat.slice(-5).map((m, i) => <li key={i}><b className="text-mute">{m.user}</b> {m.text}</li>)}</ul>
                <Btn className="mt-4" onClick={() => setScreen("home")}>End stream</Btn>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {paying && (
          <div role="dialog" aria-label="Subscribe" className="absolute inset-x-0 bottom-0 border-t border-paper/30 bg-surface p-5">
            <p className="font-medium">Subscribe to {sel.name} · illustrative NGN 2,000/month</p>
            <p className="text-sm text-mute">Pay with a local method</p>
            <div className="mt-3 flex flex-wrap gap-2">{payMethods.map((m) => <Btn key={m} onClick={() => { setSub(true); setPaying(false); }}>{m}</Btn>)}<Btn className="border-0 text-mute" onClick={() => setPaying(false)}>Cancel</Btn></div>
          </div>
        )}
      </div>
    </section>
  );
}
