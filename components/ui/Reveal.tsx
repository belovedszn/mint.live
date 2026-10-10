"use client";
import { motion, MotionConfig } from "framer-motion";
export const Motion = ({ children }: { children: React.ReactNode }) => <MotionConfig reducedMotion="user">{children}</MotionConfig>;
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay, ease: "easeOut" }}>{children}</motion.div>;
}
