"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

interface FaqItem {
  question: string;
  answer: string;
  category: "Student Outreach & YUVIKA" | "Launch Viewing (Sriharikota)" | "Recruitment & Careers" | "Missions & Technology" | "Geospatial & Bhuvan";
}

const faqList: FaqItem[] = [
  {
    category: "Student Outreach & YUVIKA",
    question: "Who is eligible to apply for ISRO's YUVIKA (Young Scientist Programme)?",
    answer: "YUVIKA is designed specifically for students studying in Class 9 in India. Selection is based on Class 8 academic marks, science fair participation, prizes in Olympiads/competitions, sports achievements, and NCC/NSS membership. Rural school students are given special weightage."
  },
  {
    category: "Student Outreach & YUVIKA",
    question: "Is there any registration fee for YUVIKA or student programs?",
    answer: "No. YUVIKA is a fully sponsored programme by ISRO. Selected students receive complete coverage for travel (sleeper class rail fare for student and one guardian), boarding, lodging, course material, and facility visit allowances."
  },
  {
    category: "Launch Viewing (Sriharikota)",
    question: "How can citizens witness a rocket launch live from Sriharikota?",
    answer: "Citizens can register online to view rocket launches from the Launch View Gallery (LVG) at Satish Dhawan Space Centre (SDSC SHAR). Registrations open on the official portal (lvg.shar.gov.in) approximately 5 to 7 days before the scheduled launch date and are allocated on a first-come, first-served basis."
  },
  {
    category: "Launch Viewing (Sriharikota)",
    question: "Where is the Launch View Gallery located?",
    answer: "The Launch View Gallery is located at Sriharikota, Andhra Pradesh, roughly 100 km north of Chennai. It provides a clear line-of-sight view of both the First and Second Launch Pads across the Pulicat Lake buffer."
  },
  {
    category: "Recruitment & Careers",
    question: "How does ISRO recruit Scientists and Engineers?",
    answer: "Recruitment for Scientist/Engineer 'SC' positions is centrally coordinated by the ISRO Centralised Recruitment Board (ICRB). Selection involves a national-level written examination followed by a technical interview for candidates with qualifying engineering degrees."
  },
  {
    category: "Recruitment & Careers",
    question: "Can undergraduate students pursue summer internships at ISRO centres?",
    answer: "Yes. ISRO research centres (like URSC Bengaluru, VSSC Thiruvananthapuram, SAC Ahmedabad) offer project trainee internships for undergraduate and postgraduate students in engineering and space sciences. Applications are submitted through the respective centre portals with institutional bonafide certificates."
  },
  {
    category: "Missions & Technology",
    question: "What is the primary objective of the Gaganyaan mission?",
    answer: "Gaganyaan aims to demonstrate India's indigenous capability for human spaceflight by launching a 3-member crew to a 400 km low Earth orbit for a 3-day mission and safely recovering them in Indian maritime waters."
  },
  {
    category: "Geospatial & Bhuvan",
    question: "How can farmers and researchers access free satellite data from Bhuvan?",
    answer: "Bhuvan (bhuvan.nrsc.gov.in) and Bhoonidhi provide open access to multispectral and radar satellite data from Cartosat, Resourcesat, and Oceansat. Datasets include soil moisture indices, flood inundation layers, crop health metrics (NDVI), and hydrological maps for public planning."
  }
];

export default function FaqPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const categories = [
    "All",
    "Student Outreach & YUVIKA",
    "Launch Viewing (Sriharikota)",
    "Recruitment & Careers",
    "Missions & Technology",
    "Geospatial & Bhuvan"
  ];

  const filtered = faqList.filter((item) => {
    const matchesCat = activeCat === "All" || item.category === activeCat;
    const matchesQuery = `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-ember">
            Knowledge Desk · Citizen Queries
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-7xl">
            Frequently Asked Questions.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Verified answers regarding student programmes, launch viewing at Sriharikota, ICRB career recruitment, and open scientific data access.
          </p>

          <div className="mt-10 max-w-md">
            <div className="flex items-center gap-3 border border-white/15 bg-white/[.04] px-4 py-3">
              <Search size={16} className="text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions (e.g. YUVIKA, launch viewing, jobs)..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="border-b border-white/10 bg-black px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setActiveCat(cat); setOpenIndex(null); }}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                activeCat === cat
                  ? "border-ember bg-ember text-white"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Accordion List */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-4">
          {filtered.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="border border-white/10 bg-white/[.02] transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left"
                >
                  <div>
                    <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-widest text-ember">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-medium text-white md:text-xl">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-white/50 transition-transform ${isOpen ? "rotate-180 text-ember" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-white/10"
                    >
                      <p className="p-6 text-sm leading-7 text-white/70">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="border border-white/10 p-12 text-center text-sm text-white/40">
              No questions found matching your search. Try asking the Citizen Space Agent in the bottom right corner.
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="border-t border-white/10 bg-white/[.01] px-6 py-16 text-center lg:px-10">
        <div className="mx-auto max-w-xl">
          <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-full border border-ember/30 bg-ember/10 text-ember mb-4">
            <Sparkles size={20} />
          </span>
          <h3 className="text-2xl font-medium text-white">Still have questions?</h3>
          <p className="mt-2 text-xs leading-6 text-white/55">
            You can query our live Citizen Space Agent anytime via the interactive bubble on the screen, or contact our communications desk directly.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:border-ember hover:text-ember"
            >
              Contact Directory
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
