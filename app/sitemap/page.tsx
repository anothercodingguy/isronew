"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass, FileText, Globe, Layers, Navigation, ShieldAlert, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

interface SitemapCategory {
  title: string;
  categoryNumber: string;
  description: string;
  icon: typeof Globe;
  links: { name: string; href: string; external?: boolean; badge?: string }[];
}

const sitemapData: SitemapCategory[] = [
  {
    title: "About ISRO & Governance",
    categoryNumber: "01",
    description: "Institutional background, founding principles, leadership, and citizen charter.",
    icon: Globe,
    links: [
      { name: "ISRO Headquarters & Organisation", href: "/contact" },
      { name: "Leadership & Council of Directors", href: "/#leadership" },
      { name: "Centres & Research Facilities", href: "/#centers" },
      { name: "Citizen Charter & Commitments", href: "/feedback" },
      { name: "Humble Beginnings & Historical Timeline", href: "/careers#apply" },
      { name: "Hindi Portal (हिंदी संस्करण)", href: "/hindi" },
    ]
  },
  {
    title: "Missions & Exploration",
    categoryNumber: "02",
    description: "Flagship missions spanning human spaceflight, lunar exploration, and solar physics.",
    icon: Compass,
    links: [
      { name: "Gaganyaan Human Spaceflight Programme", href: "/missions/gaganyaan", badge: "Flagship" },
      { name: "Chandrayaan Lunar Exploration", href: "/" },
      { name: "Aditya-L1 Solar Observatory", href: "/" },
      { name: "Launch Vehicle Systems (LVM3, PSLV, SSLV)", href: "/" },
      { name: "Earth Observation Satellites (Cartosat, Resourcesat)", href: "/#geospatial" },
      { name: "NavIC Satellite Constellation Telemetry", href: "/#telemetry" },
    ]
  },
  {
    title: "Careers & Student Programmes",
    categoryNumber: "03",
    description: "National recruitment, student initiatives, internships, and fellowships.",
    icon: Users,
    links: [
      { name: "Careers Home & Open Positions", href: "/careers" },
      { name: "YUVIKA 2026 Young Scientist Programme", href: "/careers", badge: "Class 9" },
      { name: "Application Status Live Tracker", href: "/careers" },
      { name: "DigiLocker e-KYC Verification Gateway", href: "/careers" },
      { name: "Undergraduate Summer Internships", href: "/careers" },
      { name: "Junior Research Fellowships (JRF)", href: "/careers" },
    ]
  },
  {
    title: "Geospatial & Public Data Services",
    categoryNumber: "04",
    description: "High-resolution satellite imagery, flood alerts, and agricultural monitoring.",
    icon: Layers,
    links: [
      { name: "Geospatial Hub & Earth Observation Simulator", href: "/#geospatial" },
      { name: "Bhuvan Geoportal Integration", href: "https://bhuvan.nrsc.gov.in/", external: true },
      { name: "Bhoonidhi Open Satellite Data Access", href: "https://bhoonidhi.nrsc.gov.in/", external: true },
      { name: "Disaster Inundation Maps (Brahmaputra/Assam)", href: "/#geospatial" },
      { name: "Agricultural Soil Moisture & Crop Health", href: "/#geospatial" },
    ]
  },
  {
    title: "Commercial & Startup Transfer",
    categoryNumber: "05",
    description: "IN-SPACe authorization, NSIL commercial launches, and patent licensing.",
    icon: Navigation,
    links: [
      { name: "IN-SPACe Tech Transfer Gateway", href: "/#tech-transfer" },
      { name: "Active Technology Licensing Catalogs", href: "/#tech-transfer" },
      { name: "Tenders & Central e-Procurement", href: "/tenders" },
      { name: "Commercial Launch Bookings (NSIL)", href: "/#tech-transfer" },
    ]
  },
  {
    title: "Citizen Governance & Assistance",
    categoryNumber: "06",
    description: "Public transparency, RTI statutory filings, FAQs, and support desks.",
    icon: ShieldAlert,
    links: [
      { name: "Right to Information (RTI) Portal", href: "/rti" },
      { name: "Frequently Asked Questions (FAQ)", href: "/faq" },
      { name: "Citizen Feedback & Grievances", href: "/feedback" },
      { name: "Contact Directory & Media Desk", href: "/contact" },
      { name: "Terms of Use & Disclaimers", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ]
  }
];

export default function SitemapPage() {
  const [filter, setFilter] = useState("");

  const filteredCategories = sitemapData.map((cat) => ({
    ...cat,
    links: cat.links.filter((link) =>
      link.name.toLowerCase().includes(filter.toLowerCase()) ||
      cat.title.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter((cat) => cat.links.length > 0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-ember">
            Site Architecture · Public Index
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-7xl">
            Sitemap Directory.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Complete architectural directory of ISRO public portals, missions, citizen services, student programmes, and governance documentation.
          </p>

          <div className="mt-10 max-w-md">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter links, programmes, or portals..."
              className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-ember"
            />
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col justify-between border border-white/10 bg-white/[.02] p-8"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ember/30 bg-ember/10 text-ember">
                      <Icon size={18} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-white/35">
                      {category.categoryNumber}
                    </span>
                  </div>

                  <h2 className="text-xl font-medium text-white">{category.title}</h2>
                  <p className="mt-2 text-xs leading-5 text-white/50">{category.description}</p>

                  <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                    {category.links.map((link) => (
                      <li key={link.name}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between text-xs text-white/75 transition-colors hover:text-ember"
                          >
                            <span>{link.name}</span>
                            <ArrowUpRight size={13} className="text-white/30 group-hover:text-ember" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between text-xs text-white/75 transition-colors hover:text-ember"
                          >
                            <span className="flex items-center gap-2">
                              {link.name}
                              {link.badge && (
                                <span className="rounded bg-ember/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-ember">
                                  {link.badge}
                                </span>
                              )}
                            </span>
                            <ArrowUpRight size={13} className="text-white/30 group-hover:text-ember" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
