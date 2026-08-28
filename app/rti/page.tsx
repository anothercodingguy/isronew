"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, CheckCircle, Download, FileCheck, FileText, Info, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const rtiDisclosures = [
  {
    code: "Sec 4(1)(b)(i)",
    title: "Particulars of Organization, Functions and Duties",
    desc: "Vision, mission, departmental structure under the Prime Minister's Department of Space (DoS)."
  },
  {
    code: "Sec 4(1)(b)(ii)",
    title: "Powers and Duties of Officers & Employees",
    desc: "Financial, statutory, and administrative delegations across scientific and administrative cadres."
  },
  {
    code: "Sec 4(1)(b)(iii)",
    title: "Procedure in Decision-Making & Supervision",
    desc: "Workflow governance, channel of supervision, and Space Commission oversight mechanisms."
  },
  {
    code: "Sec 4(1)(b)(iv)",
    title: "Norms for Discharge of Functions",
    desc: "Standard operating procedures, citizen charter timelines, and technical verification protocols."
  },
  {
    code: "Sec 4(1)(b)(v)",
    title: "Rules, Regulations & Instructions Held",
    desc: "ISRO Employees Service Rules, procurement manual, safety guidelines, and security policies."
  },
  {
    code: "Sec 4(1)(b)(vi)",
    title: "Statement of Categories of Documents Held",
    desc: "Public scientific reports, non-confidential telemetry datasets, and statutory filings."
  }
];

const cpioOfficers = [
  {
    center: "ISRO Headquarters (Antariksh Bhavan)",
    officer: "Dr. K. S. Rajan, Sci/Engr-SG",
    designation: "Central Public Information Officer (CPIO)",
    address: "Antariksh Bhavan, New BEL Road, Bengaluru 560094",
    phone: "+91 80 2217 2288",
    email: "cpio-hq@isro.gov.in"
  },
  {
    center: "U R Rao Satellite Centre (URSC)",
    officer: "Smt. P. Vatsala, Sci/Engr-SF",
    designation: "CPIO (Satellite Technologies)",
    address: "Old Airport Road, Vimanapura, Bengaluru 560017",
    phone: "+91 80 2508 2210",
    email: "cpio-ursc@isro.gov.in"
  },
  {
    center: "Vikram Sarabhai Space Centre (VSSC)",
    officer: "Shri M. Suresh Kumar, Sci/Engr-SG",
    designation: "CPIO (Launch Vehicle Systems)",
    address: "Thumba, Thiruvananthapuram 695022",
    phone: "+91 471 256 5500",
    email: "cpio-vssc@isro.gov.in"
  },
  {
    center: "Satish Dhawan Space Centre (SDSC SHAR)",
    officer: "Shri R. Venkatraman, Sci/Engr-SF",
    designation: "CPIO (Range & Spaceport Operations)",
    address: "Sriharikota, Tirupati Dist., AP 524124",
    phone: "+91 8623 222150",
    email: "cpio-shar@isro.gov.in"
  }
];

export default function RtiPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1 text-[10px] font-semibold uppercase tracking-[.25em] text-ember">
            <Scale size={13} />
            Right to Information Act, 2005
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-7xl">
            RTI Transparency Portal.
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-white/60 md:text-base">
            Proactive public disclosures, Central Public Information Officers (CPIOs) directory, and online statutory filing guidelines under Section 4(1)(b) of the Right to Information Act, 2005.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://rtionline.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-ember px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:bg-[#ff7654]"
            >
              File Online RTI (rtionline.gov.in) <ArrowUpRight size={15} />
            </a>
            <a
              href="#disclosures"
              className="flex items-center gap-3 border border-white/20 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:border-white/50"
            >
              Proactive Disclosures <FileText size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Proactive Disclosures Section */}
      <section id="disclosures" className="border-b border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ember">01 / Statutory Disclosures</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-5xl">Section 4(1)(b) Disclosures</h2>
            </div>
            <p className="max-w-md text-xs leading-5 text-white/50">
              Proactive transparency manuals maintained in accordance with Department of Personnel & Training guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rtiDisclosures.map((d, index) => (
              <motion.div
                key={d.code}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col justify-between border border-white/10 bg-white/[.02] p-8"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-ember">{d.code}</span>
                  <h3 className="mt-3 text-lg font-medium text-white">{d.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-white/60">{d.desc}</p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-wider text-white/40">
                  <span>Public Record</span>
                  <span className="text-emerald-400">✓ Updated 2026</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CPIO Officers Directory */}
      <section className="border-b border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12">
            <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ember">02 / Officer Directory</p>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">Central Public Information Officers</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {cpioOfficers.map((cpio) => (
              <div key={cpio.center} className="border border-white/10 bg-white/[.02] p-8">
                <p className="font-mono text-xs text-ember">{cpio.center}</p>
                <h3 className="mt-2 text-xl font-medium text-white">{cpio.officer}</h3>
                <p className="text-xs text-white/50">{cpio.designation}</p>
                <p className="mt-4 text-xs leading-5 text-white/65">{cpio.address}</p>

                <div className="mt-6 flex flex-wrap gap-6 border-t border-white/10 pt-4 text-xs text-white/50 font-mono">
                  <span>Phone: {cpio.phone}</span>
                  <span>Email: {cpio.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to File Step by Step */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ember">03 / Procedure</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">How to File an RTI Application</h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-white/[.02] p-6">
              <span className="font-mono text-xl font-bold text-ember">Step 01</span>
              <h3 className="mt-3 text-lg font-medium text-white">Visit RTI Online</h3>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Log on to the Government of India RTI portal (rtionline.gov.in) and select “Department of Space”.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[.02] p-6">
              <span className="font-mono text-xl font-bold text-ember">Step 02</span>
              <h3 className="mt-3 text-lg font-medium text-white">Draft Application</h3>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Specify the exact information required in concise terms. Avoid non-specific or hypothetical questions.
              </p>
            </div>

            <div className="border border-white/10 bg-white/[.02] p-6">
              <span className="font-mono text-xl font-bold text-ember">Step 03</span>
              <h3 className="mt-3 text-lg font-medium text-white">Statutory Fee & Tracking</h3>
              <p className="mt-2 text-xs leading-5 text-white/60">
                Pay the statutory ₹10 fee online (exempt for BPL applicants). You receive an instant tracking registration number.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
