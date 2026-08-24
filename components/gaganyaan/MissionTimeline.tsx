"use client";

import { Check, CircleDot } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Milestone { number: string; title: string; detail: string; status: "completed" | "upcoming"; }
const milestones: Milestone[] = [
  { number: "01", title: "Pad Abort Test (PAT)", detail: "Completed", status: "completed" },
  { number: "02", title: "TV-D1 Mission", detail: "Completed · CES & parachute deployment successful", status: "completed" },
  { number: "03", title: "G1 & G2 Uncrewed Missions", detail: "Upcoming · Testing Vyommitra humanoid and life support", status: "upcoming" },
  { number: "04", title: "H1 Crewed Mission", detail: "Launching 3 astronauts to 400 km LEO", status: "upcoming" }
];

export function MissionTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <section ref={ref} id="timeline" className="bg-black px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1100px]"><div className="mb-16"><p className="mb-5 text-[10px] uppercase tracking-[.32em] text-ember">A sequence of firsts</p><h2 className="text-5xl font-medium tracking-tighter md:text-7xl">Mission timeline</h2></div><div className="relative"><div className="absolute bottom-0 left-[18px] top-0 w-px bg-white/10" /><motion.div style={{ height: lineHeight }} className="absolute left-[18px] top-0 w-px origin-top bg-ember shadow-[0_0_14px_#ff5c35]" />{milestones.map((item, index) => <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: .6, delay: index * .1 }} key={item.number} className="relative grid grid-cols-[38px_1fr] gap-7 pb-16 last:pb-0 md:grid-cols-[38px_150px_1fr] md:gap-10"><div className="relative z-10 flex h-[37px] items-center justify-center rounded-full border border-white/15 bg-black">{item.status === "completed" ? <Check size={15} className="text-ember" /> : <CircleDot size={16} className="animate-pulse text-ember" />}</div><div className="pt-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35">{item.number}<br /><span className={item.status === "upcoming" ? "text-ember" : "text-white/35"}>{item.status}</span></div><div className="border border-white/10 bg-white/[.03] p-6 backdrop-blur-md md:p-8"><h3 className="text-2xl font-medium tracking-tight text-white/90 md:text-3xl">{item.title}</h3><p className="mt-3 text-sm leading-6 text-white/50">{item.detail}</p></div></motion.div>)}</div></div></section>;
}
