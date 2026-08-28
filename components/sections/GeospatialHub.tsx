"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Download, Layers, Radio, Search } from "lucide-react";
import { useMemo, useState } from "react";

interface Portal { name: string; eyebrow: string; description: string; href: string; accent: string; }
interface GeoResult { title: string; category: string; detail: string; }
interface SatelliteLayer {
  id: string;
  name: string;
  region: string;
  sensor: string;
  metric: string;
  metricLabel: string;
  useCase: string;
  description: string;
  syncTime: string;
}

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

const satelliteLayers: SatelliteLayer[] = [
  {
    id: "flood",
    name: "Flood Inundation Alert",
    region: "Brahmaputra Basin, Assam",
    sensor: "Cartosat-3 & RISAT-1A SAR",
    metric: "14,280 ha",
    metricLabel: "Submerged Area Detected",
    useCase: "Emergency Services & District Disaster Management",
    description: "High-resolution radar imaging penetrates cloud cover to map real-time flood extent, enabling rapid relief deployment.",
    syncTime: "Updated 18m ago via NRSC Shadnagar"
  },
  {
    id: "crop",
    name: "Crop Health & Soil Moisture",
    region: "Vidarbha & Marathwada, Maharashtra",
    sensor: "Resourcesat-2A AWiFS",
    metric: "NDVI 0.68",
    metricLabel: "Vegetation Health Index",
    useCase: "Farmers & PM Fasal Bima Yojana Assessment",
    description: "Multi-spectral optical data tracks moisture stress, drought indicators, and harvest yield forecasts for agricultural communities.",
    syncTime: "Updated 42m ago via SAC Ahmedabad"
  },
  {
    id: "cyclone",
    name: "Cyclone Path & Marine Winds",
    region: "Bay of Bengal & Coastal Odisha",
    sensor: "Oceansat-3 OSCAT & INSAT-3DR",
    metric: "115 km/h",
    metricLabel: "Surface Wind Velocity",
    useCase: "Coastal Fishermen Safety & Port Authorities",
    description: "Scatterometer ocean vector winds track storm intensification and generate 72-hour track projections with coastal landfall alerts.",
    syncTime: "Live Stream · MOSDAC Data Link"
  },
  {
    id: "canopy",
    name: "Forest Canopy Density & Fire Risk",
    region: "Western Ghats Biosphere Reserve",
    sensor: "Resourcesat-2 LISS-IV (5.8m)",
    metric: "78.4%",
    metricLabel: "Dense Canopy Cover",
    useCase: "Forestry Departments & Biodiversity Monitoring",
    description: "Thermal anomaly detection paired with high-resolution canopy classification flags forest fire risks in real-time.",
    syncTime: "Updated 1h ago via NRSC"
  }
];

const inlineLinkClass = "inline-flex items-center gap-1 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors";

export function GeospatialHub() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [selectedLayer, setSelectedLayer] = useState<SatelliteLayer>(satelliteLayers[0]);
  const [simulatedAction, setSimulatedAction] = useState<string | null>(null);

  const filtered = useMemo(() => results.filter((item) => `${item.title} ${item.category} ${item.detail}`.toLowerCase().includes((query || activeTag).toLowerCase())), [activeTag, query]);

  return <section className="border-t border-white/10 bg-black px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] uppercase tracking-[.32em] text-blue-400">Public data / made useful</p><h2 className="text-5xl font-medium tracking-tighter md:text-7xl">The geospatial hub.</h2></div><p className="max-w-sm text-sm leading-6 text-white/45">See India from above. Explore the portals that turn satellite intelligence into better decisions on the ground.</p></div><div className="grid grid-cols-1 gap-4 lg:grid-cols-3">{portals.map((portal) => <motion.a whileHover={{ y: -6 }} transition={{ duration: .2 }} key={portal.name} href={portal.href} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03] p-7 backdrop-blur-md transition-colors hover:border-blue-500/40"><div className={`absolute inset-0 bg-gradient-to-br ${portal.accent} to-transparent opacity-70`} /><div className="relative"><p className="mb-16 text-[9px] uppercase tracking-[.26em] text-white/40">{portal.eyebrow}</p><h3 className="text-3xl font-medium tracking-tighter">{portal.name}</h3><p className="mt-5 max-w-xs text-sm leading-6 text-white/55">{portal.description}</p><span className={`${inlineLinkClass} mt-10`}>Open portal <ArrowUpRight size={15} /></span></div></motion.a>)}</div><div className="mt-12 rounded-2xl border border-white/15 bg-[#08080a] p-6 md:p-10"><div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center"><div><p className="text-[10px] uppercase tracking-[.28em] text-blue-400 font-semibold flex items-center gap-2"><Layers size={14} />Interactive Earth Observation Simulator</p><h3 className="mt-2 text-2xl font-medium tracking-tight text-white md:text-3xl">Live Satellite Layers for India</h3></div><span className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-blue-300"><Radio size={12} className="animate-pulse text-cyan-400" />{selectedLayer.syncTime}</span></div><div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">{satelliteLayers.map((layer) => <button type="button" key={layer.id} onClick={() => { setSelectedLayer(layer); setSimulatedAction(null); }} className={`whitespace-nowrap rounded-lg border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${selectedLayer.id === layer.id ? "border-blue-400 bg-blue-500/20 text-white" : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"}`}>{layer.name}</button>)}</div><AnimatePresence mode="wait"><motion.div key={selectedLayer.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]"><div className="space-y-4"><div><span className="text-[10px] uppercase tracking-[.2em] text-white/40">Region & Scope</span><p className="text-xl font-medium text-white">{selectedLayer.region}</p></div><p className="text-sm leading-6 text-white/65">{selectedLayer.description}</p><div className="pt-2"><span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[10px] uppercase tracking-wider text-white/60"><CheckCircle2 size={12} className="text-emerald-400" />Use Case: {selectedLayer.useCase}</span></div></div><div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[.02] p-5 backdrop-blur-sm"><div><p className="text-[10px] uppercase tracking-[.2em] text-blue-400">{selectedLayer.sensor}</p><p className="mt-4 font-mono text-3xl font-bold tracking-tight text-white md:text-4xl">{selectedLayer.metric}</p><p className="mt-1 text-xs text-white/45">{selectedLayer.metricLabel}</p></div><div className="mt-6 flex flex-wrap gap-2"><button type="button" onClick={() => setSimulatedAction("overlay")} className="flex items-center gap-2 rounded bg-white/10 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[.16em] text-white transition-colors hover:bg-white/20"><Layers size={13} />Overlay Map</button><button type="button" onClick={() => setSimulatedAction("download")} className="flex items-center gap-2 rounded border border-white/15 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[.16em] text-white/70 transition-colors hover:border-white/35 hover:text-white"><Download size={13} />GeoJSON Data</button></div>{simulatedAction && <p className="mt-3 text-[10px] text-blue-300">Sandbox action: {simulatedAction === "overlay" ? "Simulated high-res satellite layer rendered on Bhuvan GIS canvas." : "Synthesized GeoTIFF/Vector bounds ready for open citizen research."}</p>}</div></motion.div></AnimatePresence></div><div className="mt-12 border border-white/10 bg-black/20 p-5 md:p-7"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="text-[10px] uppercase tracking-[.25em] text-blue-400">Citizen search</p><p className="mt-2 text-sm text-white/55">Find an Earth observation layer for your question.</p></div><label className="flex w-full max-w-md items-center gap-3 border border-white/15 bg-white/[.03] px-4 py-3"><Search size={16} className="text-white/40" /><input value={query} onChange={(event) => { setQuery(event.target.value); setActiveTag(""); }} placeholder="Search geospatial data" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30" /></label></div><div className="mt-6 flex flex-wrap gap-2">{results.map((item) => <button key={item.title} onClick={() => { setActiveTag(item.title); setQuery(""); }} className="rounded-full border border-white/15 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-white/50 transition-colors hover:border-blue-400/50 hover:text-white">{item.title}</button>)}</div>{(query || activeTag) && <div className="mt-6 grid gap-3 md:grid-cols-3">{filtered.map((item) => <div key={item.title} className="border border-white/10 p-4"><p className="text-sm text-white/85">{item.title}</p><p className="mt-2 text-[10px] uppercase tracking-[.16em] text-blue-300">{item.category}</p><p className="mt-3 text-xs leading-5 text-white/45">{item.detail}</p></div>)}{filtered.length === 0 && <p className="text-sm text-white/45">No layers found. Try another search.</p>}</div>}</div></div></section>;
}
