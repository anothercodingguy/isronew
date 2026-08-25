"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const official = (path: string) => `https://www.isro.gov.in/${path}`;
const utilityLinks: NavItem[] = [
  { label: "Sitemap", href: official("sitemap.html") },
  { label: "Contact us", href: official("contact.html") },
  { label: "Feedback", href: official("feedback.html") },
  { label: "RTI", href: official("RTI.html") },
  { label: "Tender", href: official("Tenders.html") },
  { label: "FAQ", href: official("faq.html") },
];

const navGroups: NavGroup[] = [
  { label: "About", items: [{ label: "Profile", href: official("profile.html") }, { label: "Vision, Mission & Objectives", href: official("Vision-Mission-Objectives.html") }, { label: "Citizen Charter", href: official("citizencharter.html") }, { label: "Organisational Structure", href: official("organisation.html") }, { label: "DoS Centres / Units / Enterprises", href: official("isro_centre.html") }, { label: "Leadership", href: official("leadership.html") }, { label: "Timeline", href: official("Timeline.html") }, { label: "Contact Us", href: official("contact.html") }] },
  { label: "Activities", items: [{ label: "Missions Accomplished", href: official("Mission.html") }, { label: "Upcoming Missions", href: official("FutureMissions.html") }, { label: "Science", href: official("Science.html") }, { label: "Launchers", href: official("Launchers.html") }, { label: "Satellites", href: official("Satellites.html") }, { label: "Space Applications", href: official("SpaceApplications.html") }, { label: "Gaganyaan", href: "/missions/gaganyaan" }, { label: "Research & Development", href: official("researchdevelopment.html") }, { label: "Outreach", href: official("Outreach.html") }] },
  { label: "Services", items: [{ label: "Launch Service", href: official("launchservices.html") }, { label: "Mission Support", href: official("missionsupport.html") }, { label: "Ground Systems Support", href: official("GroundSystemSupport.html") }, { label: "Satellite Communication", href: official("SatelliteCommunicationApplications.html") }, { label: "Earth Observation: Bhuvan & Bhoonidhi", href: "https://bhuvan.nrsc.gov.in/", external: true }, { label: "Satellite Navigation Services", href: official("SatelliteNavigationServices.html") }, { label: "Disaster Management", href: official("DisasterManagementNationalInternational.html") }, { label: "Technology Transfer", href: official("TechnologyTransfer.html") }] },
  { label: "Programmes", items: [{ label: "Academic Courses", href: official("AcademicCourses.html") }, { label: "Fellowships", href: official("Fellowships.html") }, { label: "Space Tutor", href: official("spacetutor.html") }, { label: "Space on Wheels", href: official("SpaceOnWheels.html") }, { label: "Student Satellite", href: official("Student_Program_Satellite.html") }, { label: "YUVIKA", href: official("YUVIKA.html") }, { label: "Technology Transfer", href: official("TechnologyTransfer.html") }] },
  { label: "Resources", items: [{ label: "River Basin Atlas", href: official("River_Basin_Atlas.html") }, { label: "Bhuvan", href: "https://bhuvan.nrsc.gov.in/", external: true }, { label: "Database for Emergency Management", href: official("DBEM.html") }, { label: "FEAST Tool", href: "https://feast.vssc.gov.in/", external: true }, { label: "I-grasp", href: "https://igrasp.isro.gov.in/", external: true }, { label: "MOSDAC", href: "https://mosdac.gov.in/", external: true }, { label: "Research Areas in Space", href: official("SupportedAreasofResearch.html") }] }
];

function NavTarget({ item, children, onClick }: { item: NavItem; children: React.ReactNode; onClick?: () => void }) {
  const external = item.external || item.href.startsWith("http");
  return external ? <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>{children}</a> : <Link href={item.href} onClick={onClick}>{children}</Link>;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setMobileGroup(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const closeMenus = () => {
    setMobileGroup(null);
    setMenuOpen(false);
  };

  return (
    <header ref={navRef} style={{ top: "var(--isro-alert-offset, 0px)" }} className="fixed left-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md transition-[top] duration-200">
      <div className="hidden border-b border-white/10 px-6 py-2 text-[9px] uppercase tracking-[.18em] text-white/45 lg:block lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex gap-3">
            <Link href="/" className="text-white/80">English</Link>
            <a href="https://www.isro.gov.in/ISRO_HINDI/" target="_blank" rel="noopener noreferrer">हिंदी</a>
            <span>|</span>
            {utilityLinks.map((link) => <span key={link.label}><NavTarget item={link}><span className="ml-3">{link.label}</span></NavTarget><span className="ml-3">|</span></span>)}
            <Link href="/careers" className="ml-3">Career</Link>
          </div>
          <span>Department of Space · Government of India</span>
        </div>
      </div>

      <div className="px-6 py-3 lg:px-10 lg:py-2">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8">
          <Logo />
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => { setSearchOpen((current) => !current); setMenuOpen(false); }} aria-label={searchOpen ? "Close search" : "Search"} className="hidden text-white/70 hover:text-white sm:block">
              {searchOpen ? <X size={18} strokeWidth={1.6} /> : <Search size={17} strokeWidth={1.6} />}
            </button>
            <button type="button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? "Close menu" : "Open menu"} className="relative z-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.24em] text-white/75 hover:text-white">
              <span className="hidden sm:block">Menu</span>
              {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/10 bg-black/95 px-6 py-5 backdrop-blur-xl lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <label className="flex items-center gap-3 border border-white/15 bg-white/[.03] px-4 py-3">
              <Search size={16} className="text-white/40" />
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search ISRO programmes, missions, and services" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" aria-label="Search ISRO programmes, missions, and services" />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {navGroups.flatMap((group) => group.items).filter((item) => !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8).map((item) => <NavTarget key={`${item.label}-${item.href}`} item={item} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}><span className="inline-flex rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-white/55 hover:border-ember hover:text-white">{item.label}</span></NavTarget>)}
            </div>
          </div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-0 top-0 -z-0 flex min-h-screen flex-col justify-center overflow-y-auto bg-[#080808] px-6 py-24 lg:px-16" aria-label="ISRO navigation menu">
          <div className="mx-auto w-full max-w-[1440px]">
            <p className="mb-8 text-[10px] uppercase tracking-[.3em] text-ember">Explore ISRO</p>
            <Link href="/" onClick={closeMenus} className="block border-b border-white/10 py-4 text-3xl font-medium text-white/90 hover:text-ember">Home</Link>
            {navGroups.map((group, index) => <div key={group.label} className="border-b border-white/10">
              <button type="button" onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)} aria-expanded={mobileGroup === group.label} className="flex w-full items-center justify-between py-4 text-left text-3xl font-medium tracking-tighter text-white/90 hover:text-ember">
                <span>{group.label}<span className="ml-3 align-top text-sm text-white/25">0{index + 1}</span></span>
                <ChevronDown size={20} className={`text-white/40 transition-transform ${mobileGroup === group.label ? "rotate-180" : ""}`} />
              </button>
              {mobileGroup === group.label && <div className="grid gap-1 pb-5 pl-2 sm:grid-cols-2">{group.items.map((item) => <NavTarget key={item.label} item={item} onClick={closeMenus}><span className="block py-2 text-sm text-white/55 hover:text-ember">{item.label}</span></NavTarget>)}</div>}
            </div>)}
          </div>
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
