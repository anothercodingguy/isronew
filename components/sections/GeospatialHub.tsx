"use client";

import { ArrowUpRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface Portal { name: string; eyebrow: string; description: string; href: string; accent: string; }
interface GeoResult { title: string; category: string; detail: string; }
const portals: Portal[] = [
  { name: "Bhuvan Geoportal", eyebrow: "Earth observation / 01", description: "2D and 3D Earth observation for urban planning, agriculture, and disaster mapping.", href: "https://bhuvan.nrsc.gov.in/", accent: "from-blue-500/25" },
  { name: "VEDAS", eyebrow: "Decision support / 02", description: "Vegetation monitoring, renewable energy potential, and air quality analysis in one view.", href: "https://vedas.sac.gov.in/", accent: "from-emerald-500/20" },
  { name: "MOSDAC", eyebrow: "Weather & ocean / 03", description: "Meteorological satellites, real-time oceanography, and cyclone paths for public use.", href: "https://mosdac.gov.in/", accent: "from-orange-500/20" }
];
const results: GeoResult[] = [
  { title: "Assam Flood Map", category: "Disaster mapping", detail: "Satellite-derived flood extent and inundation intelligence." },
  { title: "Drought Assessment", category: "Agriculture", detail: "Vegetation and soil moisture indicators for water-stressed regions." },
  { title: "Forest Canopy", category: "Environment", detail: "Earth observation layers for forest cover and change detection." }
];
const inlineLinkClass = "inline-flex items-center gap-1 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors";

export function GeospatialHub() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const filtered = useMemo(() => results.filter((item) => `${item.title} ${item.category} ${item.detail}`.toLowerCase().includes((query || activeTag).toLowerCase())), [activeTag, query]);
  return <section className="border-t border-white/10 bg-black px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] uppercase tracking-[.32em] text-blue-400">Public data / made useful</p><h2 className="text-5xl font-medium tracking-tighter md:text-7xl">The geospatial hub.</h2></div><p className="max-w-sm text-sm leading-6 text-white/45">See India from above. Explore the portals that turn satellite intelligence into better decisions on the ground.</p></div><div className="grid grid-cols-1 gap-4 lg:grid-cols-3">{portals.map((portal) => <motion.a whileHover={{ y: -6 }} transition={{ duration: .2 }} key={portal.name} href={portal.href} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03] p-7 backdrop-blur-md transition-colors hover:border-blue-500/40"><div className={`absolute inset-0 bg-gradient-to-br ${portal.accent} to-transparent opacity-70`} /><div className="relative"><p className="mb-16 text-[9px] uppercase tracking-[.26em] text-white/40">{portal.eyebrow}</p><h3 className="text-3xl font-medium tracking-tighter">{portal.name}</h3><p className="mt-5 max-w-xs text-sm leading-6 text-white/55">{portal.description}</p><span className={`${inlineLinkClass} mt-10`}>Open portal <ArrowUpRight size={15} /></span></div></motion.a>)}</div><div className="mt-16 border border-white/10 bg-black/20 p-5 md:p-7"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="text-[10px] uppercase tracking-[.25em] text-blue-400">Citizen search</p><p className="mt-2 text-sm text-white/55">Find an Earth observation layer for your question.</p></div><label className="flex w-full max-w-md items-center gap-3 border border-white/15 bg-white/[.03] px-4 py-3"><Search size={16} className="text-white/40" /><input value={query} onChange={(event) => { setQuery(event.target.value); setActiveTag(""); }} placeholder="Search geospatial data" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30" /></label></div><div className="mt-6 flex flex-wrap gap-2">{results.map((item) => <button key={item.title} onClick={() => { setActiveTag(item.title); setQuery(""); }} className="rounded-full border border-white/15 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-white/50 transition-colors hover:border-blue-400/50 hover:text-white">{item.title}</button>)}</div>{(query || activeTag) && <div className="mt-6 grid gap-3 md:grid-cols-3">{filtered.map((item) => <div key={item.title} className="border border-white/10 p-4"><p className="text-sm text-white/85">{item.title}</p><p className="mt-2 text-[10px] uppercase tracking-[.16em] text-blue-300">{item.category}</p><p className="mt-3 text-xs leading-5 text-white/45">{item.detail}</p></div>)}{filtered.length === 0 && <p className="text-sm text-white/45">No layers found. Try another search.</p>}</div>}</div></div></section>;
}
