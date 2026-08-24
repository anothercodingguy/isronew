"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { OrbitalModuleGraphic } from "./OrbitalModuleGraphic";

interface Module { id: string; label: string; title: string; description: string; accent: "orange" | "blue" | "white"; }
const modules: Module[] = [
  { id: "crew", label: "Crew Module", title: "A home for the journey.", description: "Double-walled habitable space with Earth-like environment. Houses 3 astronauts, life support, and deceleration systems for safe re-entry.", accent: "orange" },
  { id: "service", label: "Service Module", title: "Powering every second.", description: "Unpressurized structure containing thermal, propulsion, and power systems. Supports the Crew Module while in orbit.", accent: "blue" },
  { id: "escape", label: "Crew Escape System", title: "Safety by design.", description: "Powered by quick-acting, high-burn-rate solid motors to ensure astronauts are taken to a safe distance in case of launch pad or ascent emergencies.", accent: "white" }
];

export function ModuleExplorer() {
  const [activeId, setActiveId] = useState("crew");
  const active = modules.find((item) => item.id === activeId) ?? modules[0];
  return <section className="border-t border-white/10 bg-black px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] uppercase tracking-[.32em] text-ember">Inside the spacecraft</p><h2 className="text-5xl font-medium tracking-tighter md:text-7xl">Orbital module</h2></div><p className="max-w-xs text-sm leading-6 text-white/45">Three systems. One controlled environment. Everything astronauts need to go further.</p></div><div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_.9fr]"><OrbitalModuleGraphic accent={active.accent} /><div className="flex flex-col justify-between border border-white/10 bg-white/[.03] p-6 backdrop-blur-md md:p-10"><div className="flex flex-col gap-1">{modules.map((item, index) => <button type="button" key={item.id} onClick={() => setActiveId(item.id)} aria-pressed={item.id === active.id} className={`group flex items-center justify-between border-b border-white/10 py-5 text-left text-[10px] font-bold uppercase tracking-[.22em] transition-colors ${item.id === active.id ? "text-white" : "text-white/35 hover:text-white/70"}`}><span><span className="mr-4 text-ember">0{index + 1}</span>{item.label}</span><span className={`h-1.5 w-1.5 rounded-full transition ${item.id === active.id ? "bg-ember shadow-[0_0_12px_#ff5c35]" : "bg-white/20"}`} /></button>)}</div><AnimatePresence mode="wait"><motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .35 }} className="pt-16"><p className="mb-5 text-[10px] uppercase tracking-[.28em] text-ember">{active.label}</p><h3 className="text-4xl font-medium leading-[.95] tracking-tighter md:text-5xl">{active.title}</h3><p className="mt-7 max-w-md text-sm leading-7 text-white/55">{active.description}</p><a href="#timeline" className="mt-10 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors">Follow the mission <ArrowUpRight size={15} /></a></motion.div></AnimatePresence></div></div></div></section>;
}
