import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
export const metadata: Metadata = { title: "Kora | Where Africa's creators go live", description: "Early-stage product concept: a livestreaming home for African creators. Interactive investor prototype." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${grotesk.variable} ${serif.variable} ${mono.variable}`}><body className="font-sans">{children}</body></html>;
}
