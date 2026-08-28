"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, Radio, Send, ShieldCheck, User } from "lucide-react";
import { FormEvent, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const headquartersInfo = {
  name: "ISRO Headquarters (Antariksh Bhavan)",
  address: "Antariksh Bhavan, New BEL Road, Bengaluru, Karnataka 560094, India",
  phone: "+91 80 2217 2294 / 2217 2296",
  email: "care@isro.gov.in / media@isro.gov.in",
  hours: "Monday – Friday: 09:00 to 17:30 IST",
};

const centerContacts = [
  {
    code: "URSC",
    name: "U R Rao Satellite Centre",
    city: "Bengaluru, Karnataka",
    phone: "+91 80 2508 4444",
    email: "contact@ursc.gov.in",
    purpose: "Satellite Design & Integration"
  },
  {
    code: "VSSC",
    name: "Vikram Sarabhai Space Centre",
    city: "Thiruvananthapuram, Kerala",
    phone: "+91 471 256 4111",
    email: "contact@vssc.gov.in",
    purpose: "Launch Vehicle Development"
  },
  {
    code: "SDSC SHAR",
    name: "Satish Dhawan Space Centre",
    city: "Sriharikota, Andhra Pradesh",
    phone: "+91 8623 225000",
    email: "sdsc@shar.gov.in",
    purpose: "Spaceport & Launch Operations"
  },
  {
    code: "SAC",
    name: "Space Applications Centre",
    city: "Ahmedabad, Gujarat",
    phone: "+91 79 2691 3000",
    email: "contact@sac.isro.gov.in",
    purpose: "Payloads & Sensor Systems"
  },
  {
    code: "NRSC",
    name: "National Remote Sensing Centre",
    city: "Hyderabad, Telangana",
    phone: "+91 40 2387 9572",
    email: "info@nrsc.gov.in",
    purpose: "Bhuvan & Earth Observation"
  },
  {
    code: "ISTRAC",
    name: "ISRO Telemetry, Tracking & Command",
    city: "Bengaluru, Karnataka",
    phone: "+91 80 2838 7777",
    email: "istrac@isro.gov.in",
    purpose: "Deep Space Network & Tracking"
  }
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Public Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const generatedId = `ISRO-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedId);
    setSubmitted(true);
  };

  const handleDemoFill = () => {
    setName("Aarav Sharma");
    setEmail("aarav.sharma@students.ac.in");
    setSubject("Student Facility Visit Inquiry (Class 9 / YUVIKA)");
    setMessage("Respected Officials, our science batch is preparing for the national space outreach cycle. Could you please guide us on scheduled public visitor gallery passes for the next Sriharikota launch?");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-ember">
            Communications Desk · Official Directory
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-7xl">
            Contact & Directory.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Reach out to ISRO Headquarters, specialized mission research centres, media relations, or submit a citizen query through our digital assistance desk.
          </p>
        </div>
      </section>

      {/* Main Grid: HQ & Inquiry Form */}
      <section className="border-b border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column: Headquarters Card */}
          <div className="space-y-8 lg:col-span-5">
            <div className="border border-white/10 bg-white/[.02] p-8">
              <p className="mb-2 text-[10px] uppercase tracking-[.25em] text-ember">Central Administration</p>
              <h2 className="text-2xl font-medium text-white">{headquartersInfo.name}</h2>

              <div className="mt-8 space-y-6 text-xs text-white/70">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="mt-0.5 text-ember shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Postal Address</p>
                    <p className="mt-1 leading-5 text-white/60">{headquartersInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={18} className="mt-0.5 text-ember shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Telephone Directory</p>
                    <p className="mt-1 text-white/60">{headquartersInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={18} className="mt-0.5 text-ember shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Official Electronic Mail</p>
                    <p className="mt-1 text-white/60">{headquartersInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[11px] uppercase tracking-wider text-white/40">Working Hours</p>
                <p className="mt-1 text-xs text-white/80">{headquartersInfo.hours}</p>
              </div>
            </div>

            {/* Launch Viewing Gallery Info */}
            <div className="border border-white/10 bg-ember/[.04] p-6 text-xs text-white/65">
              <p className="font-semibold text-ember uppercase tracking-wider text-[10px] mb-2">Visitor Gallery at Sriharikota</p>
              <p className="leading-5">
                Public launch viewing at Satish Dhawan Space Centre (SDSC SHAR) requires prior registration on the official portal (lvg.shar.gov.in) when launch windows are officially announced.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Query Form */}
          <div className="border border-white/10 bg-white/[.02] p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-ember">Citizen Assistance Desk</p>
                <h3 className="text-xl font-medium text-white">Submit a Public Inquiry</h3>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-[10px] uppercase tracking-wider text-ember transition-colors hover:bg-ember hover:text-white"
              >
                ⚡ Quick Demo Fill
              </button>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={32} />
                </span>
                <h4 className="mt-6 text-2xl font-medium text-white">Inquiry Acknowledged</h4>
                <p className="mt-2 text-sm text-white/60">
                  Your reference ticket has been logged in the citizen communications registry:
                </p>
                <div className="mt-6 inline-block rounded-lg border border-white/20 bg-white/[.05] px-6 py-3 font-mono text-base font-bold text-ember">
                  {ticketId}
                </div>
                <p className="mt-4 text-xs text-white/40">
                  A response will be transmitted to {email} within statutory turnaround guidelines.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 border border-white/20 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:border-white/50"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-sm">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Your Full Name</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none focus:border-ember"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Email Address</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none focus:border-ember"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Subject Area</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-white/15 bg-black px-4 py-3 text-white outline-none focus:border-ember"
                  >
                    <option value="General Public Inquiry">General Public Inquiry</option>
                    <option value="Student Programmes (YUVIKA / Internships)">Student Programmes (YUVIKA / Internships)</option>
                    <option value="Launch Viewing at Sriharikota">Launch Viewing at Sriharikota</option>
                    <option value="Media & Press Relations">Media & Press Relations</option>
                    <option value="Commercial / IN-SPACe Startup Gateway">Commercial / IN-SPACe Startup Gateway</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Inquiry Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message or inquiry..."
                    className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none focus:border-ember"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 bg-ember py-4 text-[11px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:bg-[#ff7654]"
                >
                  Send Inquiry <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ISRO Centres Phone Directory */}
      <section className="px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ember">02 / Field Centres</p>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">ISRO Centres Directory</h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {centerContacts.map((c) => (
              <div key={c.code} className="border border-white/10 bg-white/[.02] p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-ember">{c.code}</span>
                <h3 className="mt-1 text-lg font-medium text-white">{c.name}</h3>
                <p className="text-xs text-white/40">{c.city} · {c.purpose}</p>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-white/60 font-mono">
                  <p className="flex items-center gap-2"><Phone size={13} className="text-white/40" />{c.phone}</p>
                  <p className="flex items-center gap-2"><Mail size={13} className="text-white/40" />{c.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
