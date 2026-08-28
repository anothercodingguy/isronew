"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Calendar, Download, FileSpreadsheet, Filter, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

interface Tender {
  id: string;
  center: string;
  title: string;
  category: "Propulsion" | "Avionics" | "Cleanroom & Infra" | "Composite Materials" | "General Procurement";
  closingDate: string;
  type: "Global" | "Limited" | "Open (GeM / CPPP)";
  emd: string;
}

const tenderList: Tender[] = [
  {
    id: "ISRO/URSC/EOI/2026/048",
    center: "URSC Bengaluru",
    title: "Supply, Testing and Cleanroom Integration of Flight-Grade Solar Array Drive Mechanisms (SADM)",
    category: "Avionics",
    closingDate: "15-Sep-2026",
    type: "Open (GeM / CPPP)",
    emd: "₹2,50,000"
  },
  {
    id: "ISRO/VSSC/TND/2026/112",
    center: "VSSC Thiruvananthapuram",
    title: "Precision CNC Machining and Non-Destructive Testing of Semi-Cryogenic Booster Nozzle Assemblies",
    category: "Propulsion",
    closingDate: "22-Sep-2026",
    type: "Limited",
    emd: "₹5,00,000"
  },
  {
    id: "ISRO/SHAR/INFRA/2026/089",
    center: "SDSC SHAR Sriharikota",
    title: "Annual Maintenance and Environmental Monitoring of Second Launch Pad High-Pressure Cryo Gas Lines",
    category: "Cleanroom & Infra",
    closingDate: "30-Sep-2026",
    type: "Open (GeM / CPPP)",
    emd: "₹1,80,000"
  },
  {
    id: "ISRO/SAC/OPTICS/2026/033",
    center: "SAC Ahmedabad",
    title: "Fabrication and Surface Interferometric Polishing of Ultra-Lightweight Carbon Composite Optical Benches",
    category: "Composite Materials",
    closingDate: "05-Oct-2026",
    type: "Global",
    emd: "₹7,50,000"
  },
  {
    id: "ISRO/ISTRAC/SYS/2026/061",
    center: "ISTRAC Bengaluru",
    title: "Supply and Rack Installation of 100Gbps Low-Latency Network Core Switches for Deep Space Ground Antennas",
    category: "Avionics",
    closingDate: "12-Oct-2026",
    type: "Open (GeM / CPPP)",
    emd: "₹3,20,000"
  }
];

export default function TendersPage() {
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Propulsion", "Avionics", "Cleanroom & Infra", "Composite Materials"];

  const filtered = tenderList.filter((t) => {
    const matchesCat = selectedCat === "All" || t.category === selectedCat;
    const matchesQuery = `${t.id} ${t.title} ${t.center}`.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-ember">
            e-Procurement · Industry Partnerships
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-7xl">
            Tenders & Procurement.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/60 md:text-base">
            Official procurement notices, Expression of Interest (EOI) calls, and vendor engagement opportunities across ISRO research centres and the Government e-Marketplace (GeM).
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://eproc.isro.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-ember px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:bg-[#ff7654]"
            >
              ISRO e-Procurement Portal <ArrowUpRight size={15} />
            </a>
            <a
              href="https://gem.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-white/20 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:border-white/50"
            >
              GeM Portal <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Tender Search & Filter Bar */}
      <section className="border-b border-white/10 bg-black px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex flex-1 items-center gap-3 border border-white/15 bg-white/[.03] px-4 py-3">
              <Search size={16} className="text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by tender ID, system keyword, or ISRO centre..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedCat === cat
                      ? "border-ember bg-ember text-white"
                      : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tenders Table / Cards */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
            <span>{filtered.length} Active Notice{filtered.length === 1 ? "" : "s"} Found</span>
            <span>Central e-Procurement System (CPPP) Sync</span>
          </div>

          <div className="space-y-4">
            {filtered.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col justify-between gap-6 border border-white/10 bg-white/[.02] p-6 transition-colors hover:border-ember/40 hover:bg-white/[.04] md:flex-row md:items-center"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs font-semibold text-ember">{t.id}</span>
                    <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-white/50">
                      {t.center}
                    </span>
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-cyan-300">
                      {t.type}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-medium text-white group-hover:text-white/90">
                    {t.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-white/45 font-mono">
                    <span>Category: {t.category}</span>
                    <span>EMD: {t.emd}</span>
                    <span className="flex items-center gap-1.5 text-white/70">
                      <Calendar size={13} className="text-ember" /> Closing: {t.closingDate}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <a
                    href="https://eproc.isro.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:border-ember hover:bg-ember"
                  >
                    Bid on Portal <ArrowUpRight size={13} />
                  </a>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="border border-white/10 p-12 text-center text-sm text-white/40">
                No active tenders match your selected search criteria.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vendor Registration Info */}
      <section className="border-t border-white/10 bg-white/[.01] px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border border-white/10 p-6">
            <span className="text-[10px] uppercase tracking-widest text-ember font-mono">01 / MSME & Startups</span>
            <h4 className="mt-2 text-lg font-medium text-white">Public Procurement Policy</h4>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Relaxation of prior turnover and experience criteria for recognized space startups and MSMEs as per Government of India directives.
            </p>
          </div>

          <div className="border border-white/10 p-6">
            <span className="text-[10px] uppercase tracking-widest text-ember font-mono">02 / IN-SPACe Gateway</span>
            <h4 className="mt-2 text-lg font-medium text-white">Private Industry Authorization</h4>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Single-window clearance mechanism for non-government entities (NGEs) seeking technical collaboration and facility access.
            </p>
          </div>

          <div className="border border-white/10 p-6">
            <span className="text-[10px] uppercase tracking-widest text-ember font-mono">03 / Integrity Pact</span>
            <h4 className="mt-2 text-lg font-medium text-white">Transparent Bidding</h4>
            <p className="mt-2 text-xs leading-5 text-white/55">
              Standard Integrity Pact commitments for high-value tenders overseen by Independent External Monitors (IEMs).
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
