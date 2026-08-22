"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronRight, MapPin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type Segment = "All Openings" | "Full-Time (ICRB)" | "Student Internships" | "YUVIKA & Young Scientists" | "Research Fellowships";
type RoleCategory = "Full-Time" | "Internships" | "YUVIKA" | "Fellowships";
type DrawerView = "overview" | "application" | "confirmation";

interface Role {
  title: string;
  category: RoleCategory;
  location: string;
  level: string;
  team: string;
  summary: string;
  pay: string;
  eligibility: string;
}

const roles: Role[] = [
  { title: "YUVIKA 2026 Young Scientist Programme", category: "YUVIKA", location: "Multi-Center", level: "Class 9", team: "Student Programmes", summary: "A hands-on introduction to space science, technology, and the people who make it possible.", pay: "Fully sponsored programme", eligibility: "Students studying in Class 9 in India with a strong interest in science and technology." },
  { title: "Avionics & Telemetry Summer Internship", category: "Internships", location: "URSC Bengaluru", level: "Undergrad", team: "Avionics & Telemetry", summary: "Work with the teams turning spacecraft signals into mission-critical decisions.", pay: "₹15,000 / month stipend", eligibility: "Undergraduate students pursuing Electronics, Avionics, Instrumentation, or related engineering disciplines." },
  { title: "Junior Research Fellow - Atmospheric Science", category: "Fellowships", location: "SPL Thiruvananthapuram", level: "Masters/PhD", team: "Space Physics Laboratory", summary: "Study the atmosphere above us and the patterns that shape our changing planet.", pay: "As per ISRO fellowship norms", eligibility: "M.Sc. or M.Tech. in Atmospheric Science, Physics, Earth Science, or a closely related field." },
  { title: "Flight Systems Engineer", category: "Full-Time", location: "SDSC Sriharikota", level: "Experienced", team: "Launch Vehicles", summary: "Own the systems that move India’s missions from the launch pad into orbit.", pay: "Level 10–12 pay band", eligibility: "Degree in Aerospace, Mechanical, Electrical, or related engineering with relevant flight systems experience." },
  { title: "Ground Station Software Engineer", category: "Full-Time", location: "ISTRAC Bengaluru", level: "Full-Time", team: "Ground Systems", summary: "Build the software layer that keeps spacecraft connected, understood, and on mission.", pay: "Level 10–12 pay band", eligibility: "Degree in Computer Science, Software Engineering, or related field with strong systems programming experience." }
];

const segments: Segment[] = ["All Openings", "Full-Time (ICRB)", "Student Internships", "YUVIKA & Young Scientists", "Research Fellowships"];
const trackerStages = ["Application Submitted", "Document Verification", "Shortlisted for Written Test", "Final Call"];

function matchesSegment(role: Role, segment: Segment) {
  if (segment === "All Openings") return true;
  if (segment === "Full-Time (ICRB)") return role.category === "Full-Time";
  if (segment === "Student Internships") return role.category === "Internships";
  if (segment === "YUVIKA & Young Scientists") return role.category === "YUVIKA";
  return role.category === "Fellowships";
}

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<Segment>("All Openings");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [drawerView, setDrawerView] = useState<DrawerView>("overview");
  const [applicationStep, setApplicationStep] = useState(1);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [trackerId, setTrackerId] = useState("");
  const [trackedId, setTrackedId] = useState("");

  const filteredRoles = useMemo(() => roles.filter((role) => {
    const haystack = `${role.title} ${role.team} ${role.location} ${role.level}`.toLowerCase();
    return matchesSegment(role, segment) && haystack.includes(query.toLowerCase());
  }), [query, segment]);

  function openRole(role: Role) {
    setSelectedRole(role);
    setDrawerView("overview");
    setApplicationStep(1);
  }

  function closeDrawer() {
    setSelectedRole(null);
    setDrawerView("overview");
  }

  function showTracker(id = trackerId) {
    const normalizedId = id.trim().toUpperCase();
    if (normalizedId) setTrackedId(normalizedId);
  }

  return <main className="bg-black"><Navbar />
    <section className="relative flex min-h-[78vh] items-end overflow-hidden border-b border-white/10 px-6 pb-14 pt-44 lg:px-10 lg:pb-20"><img src="https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=2400&q=90" alt="Rocket launch at dusk" className="absolute inset-0 h-full w-full object-cover opacity-65" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/30" /><div className="relative mx-auto w-full max-w-[1440px]"><p className="mb-8 text-[10px] uppercase tracking-[.32em] text-ember">Build what comes next</p><h1 className="max-w-6xl text-[clamp(4.4rem,12vw,12rem)] font-bold uppercase leading-[.78] tracking-tighter">Make history<br /><span className="text-white/50">with us.</span></h1><div className="mt-12 flex flex-col justify-between gap-8 text-sm text-white/60 md:flex-row md:items-end"><p className="max-w-md leading-7">India’s space programme is entering its next era. Bring your mind, your craft, and your sense of possibility to the team taking it there.</p><a href="#open-roles" className="flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.25em] text-white transition-colors hover:text-ember">See open positions <ArrowDown size={16} /></a></div></div></section>

    <section className="border-b border-white/10 bg-[#111111] px-6 py-20 lg:px-10 lg:py-28"><div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-3 md:gap-8"><div><p className="mb-5 text-[10px] uppercase tracking-[.28em] text-ember">01 / The mission</p><h2 className="text-3xl font-medium leading-tight tracking-tighter md:text-4xl">A career that reaches further.</h2></div><p className="max-w-md text-sm leading-7 text-white/55">At ISRO, every role contributes to something larger than a job description. We solve complex problems, build with purpose, and create technology that improves life across the nation.</p><p className="max-w-md text-sm leading-7 text-white/55">From the launch pad to deep space, you’ll work alongside people who are curious, rigorous, and determined to make the impossible routine.</p></div></section>

    <section id="open-roles" className="px-6 py-20 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] uppercase tracking-[.28em] text-ember">02 / Opportunities</p><h2 className="text-5xl font-medium tracking-tighter md:text-7xl">Find your orbit.</h2></div><p className="max-w-xs text-sm leading-6 text-white/45">Explore opportunities across ISRO centres and programmes.</p></div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">{segments.map((item) => <button key={item} onClick={() => setSegment(item)} className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${segment === item ? "border-ember bg-ember text-white" : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"}`}>{item}</button>)}</div>
      <div className="mb-10 flex flex-col gap-3 lg:flex-row"><label className="flex flex-1 items-center gap-3 border border-white/20 bg-white/[.03] px-4 py-4"><Search size={17} className="text-white/40" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search roles, teams, or locations" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" /></label><button onClick={() => setTrackerOpen(true)} className="flex items-center justify-center gap-3 border border-white/20 px-5 py-4 text-[10px] font-bold uppercase tracking-[.2em] text-white/70 transition-colors hover:border-ember hover:text-white">Track status <ChevronRight size={15} /></button></div>
      <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-white/35"><span>{filteredRoles.length} opening{filteredRoles.length === 1 ? "" : "s"}</span><span>Click a role to view details</span></div><div className="border-t border-white/15">{filteredRoles.map((role, index) => <motion.button initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} onClick={() => openRole(role)} key={role.title} className="group grid w-full gap-4 border-b border-white/10 py-6 text-left transition-colors hover:bg-white/[.04] md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-center md:px-4"><div><h3 className="text-xl font-medium tracking-tight text-white/90">{role.title}</h3><p className="mt-1 text-xs text-white/40">{role.team}</p></div><span className="flex items-center gap-2 text-xs uppercase tracking-[.16em] text-white/45"><MapPin size={13} />{role.location}</span><span className="text-xs uppercase tracking-[.16em] text-white/45">{role.level}</span><ArrowUpRight size={18} className="text-ember transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></motion.button>)}{filteredRoles.length === 0 && <p className="border-b border-white/10 py-12 text-center text-sm text-white/45">No roles match your search. Try another path.</p>}</div></div></section>

    <section id="apply" className="relative overflow-hidden border-y border-white/10 bg-[#111111] px-6 py-24 lg:px-10 lg:py-36"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,92,53,.18),transparent_55%)]" /><div className="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="mb-5 text-[10px] uppercase tracking-[.28em] text-ember">03 / Your next move</p><h2 className="max-w-3xl text-5xl font-medium leading-[.9] tracking-tighter md:text-8xl">The future is<br />a team effort.</h2></div><a href="mailto:careers@isro.gov.in" className="group flex w-fit items-center gap-4 border border-white/40 px-5 py-4 text-[10px] font-bold uppercase tracking-[.22em] transition-colors hover:border-ember hover:bg-ember">Start a conversation <ArrowUpRight size={15} /></a></div></section>
    <Footer />

    <AnimatePresence>{selectedRole && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={closeDrawer}><motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 280 }} onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-white/10 bg-[#0b0b0b] p-6 md:p-10"><button onClick={closeDrawer} className="mb-14 ml-auto flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-ember hover:text-white" aria-label="Close role details"><X size={18} /></button>{drawerView === "overview" && <RoleOverview role={selectedRole} onApply={() => setDrawerView("application")} />}{drawerView === "application" && <ApplicationForm role={selectedRole} step={applicationStep} setStep={setApplicationStep} onBack={() => setDrawerView("overview")} onSubmit={() => setDrawerView("confirmation")} />}{drawerView === "confirmation" && <ApplicationConfirmation onClose={closeDrawer} />}</motion.aside></motion.div>}</AnimatePresence>
    <AnimatePresence>{trackerOpen && <TrackerModal trackerId={trackerId} setTrackerId={setTrackerId} trackedId={trackedId} onTrack={() => showTracker()} onDemo={() => { setTrackerId("ISRO-2026-4821"); setTrackedId("ISRO-2026-4821"); }} onClose={() => { setTrackerOpen(false); setTrackedId(""); }} />}</AnimatePresence>
  </main>;
}

function RoleOverview({ role, onApply }: { role: Role; onApply: () => void }) {
  return <div><p className="mb-5 text-[10px] uppercase tracking-[.28em] text-ember">{role.category} · {role.team}</p><h2 className="text-4xl font-medium leading-[.95] tracking-tighter md:text-5xl">{role.title}</h2><div className="mt-7 flex flex-wrap gap-3 text-[10px] uppercase tracking-[.15em] text-white/45"><span className="flex items-center gap-2 border border-white/10 px-3 py-2"><MapPin size={13} />{role.location}</span><span className="border border-white/10 px-3 py-2">{role.level}</span></div><p className="mt-12 text-base leading-7 text-white/65">{role.summary}</p><div className="mt-12 grid gap-8 border-y border-white/10 py-8"><div><p className="mb-2 text-[10px] uppercase tracking-[.22em] text-white/35">Stipend / pay band</p><p className="text-sm text-white/80">{role.pay}</p></div><div><p className="mb-2 text-[10px] uppercase tracking-[.22em] text-white/35">Eligibility</p><p className="text-sm leading-6 text-white/60">{role.eligibility}</p></div></div><button onClick={onApply} className="mt-10 flex w-full items-center justify-center gap-3 bg-ember px-5 py-4 text-[10px] font-bold uppercase tracking-[.22em] transition-colors hover:bg-[#ff7654]">Apply now <ArrowUpRight size={15} /></button></div>;
}

function ApplicationForm({ role, step, setStep, onBack, onSubmit }: { role: Role; step: number; setStep: (step: number) => void; onBack: () => void; onSubmit: () => void }) {
  return <div><button onClick={onBack} className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-white/45 hover:text-white"><ArrowLeft size={15} />Back to role</button><p className="mb-5 text-[10px] uppercase tracking-[.28em] text-ember">Application · Step {step} of 2</p><h2 className="text-4xl font-medium tracking-tighter">{step === 1 ? "Tell us about you." : "Your space in the mission."}</h2><div className="mt-8 flex gap-2">{[1, 2].map((item) => <div key={item} className={`h-1 flex-1 ${item <= step ? "bg-ember" : "bg-white/15"}`} />)}</div>{step === 1 ? <div className="mt-12 space-y-5"><Field label="Full name" placeholder="Your name" /><Field label="Email address" placeholder="you@example.com" type="email" /><Field label="Phone number" placeholder="+91" /><button onClick={() => setStep(2)} className="mt-5 flex w-full items-center justify-center gap-3 bg-ember px-5 py-4 text-[10px] font-bold uppercase tracking-[.22em]">Continue <ArrowRight size={15} /></button></div> : <div className="mt-12 space-y-5"><Field label="Resume / portfolio link" placeholder="https://" /><label className="block text-[10px] uppercase tracking-[.2em] text-white/45">Why ISRO? <textarea rows={5} placeholder="Tell us what you want to build..." className="mt-3 w-full resize-none border border-white/15 bg-white/[.03] p-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-ember" /></label><button onClick={onSubmit} className="mt-5 flex w-full items-center justify-center gap-3 bg-ember px-5 py-4 text-[10px] font-bold uppercase tracking-[.22em]">Submit application <ArrowUpRight size={15} /></button></div>}</div>;
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return <label className="block text-[10px] uppercase tracking-[.2em] text-white/45">{label}<input type={type} placeholder={placeholder} className="mt-3 w-full border border-white/15 bg-white/[.03] p-4 text-sm normal-case tracking-normal text-white outline-none placeholder:text-white/25 focus:border-ember" /></label>;
}

function ApplicationConfirmation({ onClose }: { onClose: () => void }) {
  return <div className="flex min-h-[70vh] flex-col justify-center text-center"><CheckCircle2 size={52} className="mx-auto text-ember" /><p className="mt-8 text-[10px] uppercase tracking-[.28em] text-ember">Application received</p><h2 className="mt-5 text-5xl font-medium leading-[.9] tracking-tighter">You’re in the queue.</h2><p className="mx-auto mt-7 max-w-sm text-sm leading-6 text-white/55">Application submitted! Your ID is <span className="text-white">ISRO-2026-4821</span></p><button onClick={onClose} className="mx-auto mt-10 border border-white/30 px-5 py-4 text-[10px] font-bold uppercase tracking-[.22em] hover:border-ember">Done</button></div>;
}

function TrackerModal({ trackerId, setTrackerId, trackedId, onTrack, onDemo, onClose }: { trackerId: string; setTrackerId: (value: string) => void; trackedId: string; onTrack: () => void; onDemo: () => void; onClose: () => void }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md" onClick={onClose}><motion.div initial={{ opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-2xl border border-white/15 bg-[#111111] p-6 md:p-10"><button onClick={onClose} className="absolute right-5 top-5 text-white/45 hover:text-white" aria-label="Close tracker"><X size={19} /></button><p className="text-[10px] uppercase tracking-[.28em] text-ember">Application tracker</p><h2 className="mt-5 text-4xl font-medium tracking-tighter md:text-5xl">Know your next step.</h2><div className="mt-8 flex flex-col gap-3 sm:flex-row"><input value={trackerId} onChange={(event) => setTrackerId(event.target.value)} placeholder="Enter application ID" className="flex-1 border border-white/15 bg-black px-4 py-4 text-sm uppercase tracking-[.12em] text-white outline-none placeholder:text-white/25 focus:border-ember" /><button onClick={onTrack} className="bg-ember px-5 py-4 text-[10px] font-bold uppercase tracking-[.2em]">Track status</button></div><button onClick={onDemo} className="mt-4 text-[10px] uppercase tracking-[.18em] text-white/45 underline decoration-white/20 underline-offset-4 hover:text-white">Use demo application</button>{trackedId && <div className="mt-12 border-t border-white/10 pt-8"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[.2em] text-white/35">Tracking</p><p className="font-mono text-xs text-ember">{trackedId}</p></div><div className="mt-8 grid gap-5 sm:grid-cols-4">{trackerStages.map((stage, index) => <div key={stage} className="relative"><div className={`mb-4 flex h-8 w-8 items-center justify-center rounded-full border ${index < 2 ? "border-ember bg-ember text-white" : index === 2 ? "border-ember text-ember" : "border-white/20 text-white/25"}`}>{index < 2 ? <Check size={14} /> : index + 1}</div>{index < trackerStages.length - 1 && <div className={`absolute left-8 top-4 hidden h-px w-[calc(100%-1rem)] sm:block ${index < 1 ? "bg-ember" : "bg-white/15"}`} />}<p className={`max-w-[120px] text-[10px] leading-4 ${index <= 1 ? "text-white/80" : "text-white/35"}`}>{stage}</p></div>)}</div><p className="mt-8 text-xs text-white/45">Your application is currently being reviewed by the mission recruitment team.</p></div>}</motion.div></motion.div>;
}
