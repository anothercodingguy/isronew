"use client";

import { motion } from "framer-motion";

export function MissionObjective() {
  return <section className="bg-black px-6 py-32 lg:px-10 lg:py-48"><motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .9 }} className="mx-auto max-w-[1440px]"><p className="mb-8 text-[10px] uppercase tracking-[.32em] text-ember">The objective</p><p className="max-w-6xl text-[clamp(2.8rem,6.5vw,7rem)] font-medium leading-[.95] tracking-tighter text-white/90">Demonstrating indigenous capability of human spaceflight to low Earth orbit for 3 days, returning safely to Indian waters.</p></motion.div></section>;
}
