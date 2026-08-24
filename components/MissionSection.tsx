"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Mission { number: string; eyebrow: string; title: string; description: string; image: string; alt: string; align?: "left" | "right"; }
const inlineLinkClass = "inline-flex items-center gap-1 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors";

export function MissionSection({ mission }: { mission: Mission }) {
  const reversed = mission.align === "right";
  return <section className="group relative border-t border-white/10" id={mission.number === "01" ? "missions" : undefined}><div className={`mx-auto grid grid-cols-1 max-w-[1600px] lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}><div className="relative min-h-[420px] overflow-hidden lg:min-h-[650px]"><Image src={mission.image} alt={mission.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale-[20%] transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" /></div><motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: .7 }} className="flex min-h-[420px] flex-col justify-center px-6 py-16 lg:min-h-[650px] lg:px-20 xl:px-28"><div><div className="mb-12 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.28em] text-ember">{mission.eyebrow}</span><span className="text-sm text-white/35">{mission.number}</span></div><h2 className="max-w-xl text-5xl font-medium leading-[.92] tracking-tighter md:text-7xl">{mission.title}</h2><p className="mt-8 max-w-md text-sm leading-7 text-white/55 md:text-base">{mission.description}</p><a href="#footer" className={`${inlineLinkClass} group/link mt-10`}>Explore program <ArrowUpRight size={15} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" /></a></div></motion.div></div></section>;
}
