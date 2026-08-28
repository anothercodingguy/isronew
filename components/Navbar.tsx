"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useLanguage } from "@/src/context/LanguageContext";

interface NavItem {
  label: string;
  labelHi?: string;
  href: string;
  external?: boolean;
}

interface NavGroup {
  label: string;
  labelHi: string;
  items: NavItem[];
}

const official = (path: string) => `https://www.isro.gov.in/${path}`;

const utilityLinks: NavItem[] = [
  { label: "Sitemap", labelHi: "साइटमैप", href: "/sitemap" },
  { label: "Contact us", labelHi: "संपर्क करें", href: "/contact" },
  { label: "Feedback", labelHi: "प्रतिक्रिया", href: "/feedback" },
  { label: "RTI", labelHi: "आरटीआई", href: "/rti" },
  { label: "Tender", labelHi: "निविदाएं", href: "/tenders" },
  { label: "FAQ", labelHi: "सामान्य प्रश्न", href: "/faq" },
];

const navGroups: NavGroup[] = [
  {
    label: "About",
    labelHi: "परिचय",
    items: [
      { label: "Profile", labelHi: "संगठन प्रोफ़ाइल", href: official("profile.html") },
      { label: "Vision, Mission & Objectives", labelHi: "दृष्टि, उद्देश्य एवं लक्ष्य", href: official("Vision-Mission-Objectives.html") },
      { label: "Citizen Charter", labelHi: "नागरिक घोषणापत्र", href: "/feedback" },
      { label: "Organisational Structure", labelHi: "संगठनात्मक ढांचा", href: official("organisation.html") },
      { label: "DoS Centres / Units", labelHi: "इसरो केंद्र एवं इकाइयां", href: "/#centers" },
      { label: "Leadership", labelHi: "नेतृत्व", href: official("leadership.html") },
      { label: "Timeline", labelHi: "ऐतिहासिक समयरेखा", href: "/careers#apply" },
      { label: "Contact Us", labelHi: "संपर्क विवरण", href: "/contact" }
    ]
  },
  {
    label: "Activities",
    labelHi: "गतिविधियां",
    items: [
      { label: "Missions Accomplished", labelHi: "सफल ऐतिहासिक मिशन", href: official("Mission.html") },
      { label: "Upcoming Missions", labelHi: "आगामी अंतरिक्ष मिशन", href: official("FutureMissions.html") },
      { label: "Science", labelHi: "अंतरिक्ष विज्ञान", href: official("Science.html") },
      { label: "Launchers", labelHi: "प्रक्षेपण यान (LVM3 / PSLV)", href: "/" },
      { label: "Satellites", labelHi: "उपग्रह प्रणालियां", href: official("Satellites.html") },
      { label: "Gaganyaan", labelHi: "गगनयान मानव अंतरिक्ष उड़ान", href: "/missions/gaganyaan" },
      { label: "Outreach", labelHi: "सार्वजनिक प्रसार", href: official("Outreach.html") }
    ]
  },
  {
    label: "Services",
    labelHi: "सेवाएं",
    items: [
      { label: "Launch Service", labelHi: "वाणिज्यिक प्रक्षेपण (NSIL)", href: official("launchservices.html") },
      { label: "Earth Observation (Bhuvan & Bhoonidhi)", labelHi: "भू-स्थानिक अवलोकन (भुवन)", href: "/#geospatial" },
      { label: "Satellite Navigation Services", labelHi: "नाविक नेविगेशन उपग्रह", href: "/#telemetry" },
      { label: "Disaster Management", labelHi: "आपदा प्रबंधन सहायता", href: "/#geospatial" },
      { label: "Technology Transfer", labelHi: "प्रौद्योगिकी हस्तांतरण (IN-SPACe)", href: "/#tech-transfer" }
    ]
  },
  {
    label: "Programmes",
    labelHi: "कार्यक्रम",
    items: [
      { label: "YUVIKA (Young Scientist)", labelHi: "युविका (युवा वैज्ञानिक कार्यक्रम)", href: "/careers" },
      { label: "Academic Courses", labelHi: "शैक्षणिक पाठ्यक्रम", href: official("AcademicCourses.html") },
      { label: "Fellowships", labelHi: "अनुसंधान अध्येतावृत्ति", href: "/careers" },
      { label: "Student Satellites", labelHi: "छात्र उपग्रह पहल", href: official("Student_Program_Satellite.html") }
    ]
  },
  {
    label: "Resources",
    labelHi: "संसाधन",
    items: [
      { label: "Bhuvan Geoportal", labelHi: "भुवन भू-स्थानिक पोर्टल", href: "https://bhuvan.nrsc.gov.in/", external: true },
      { label: "Bhoonidhi Open Data", labelHi: "भूनिधि उपग्रह डेटा", href: "https://bhoonidhi.nrsc.gov.in/", external: true },
      { label: "MOSDAC Meteorological Data", labelHi: "मोसडैक मौसम विज्ञान", href: "https://mosdac.gov.in/", external: true },
      { label: "Research Areas in Space", labelHi: "अंतरिक्ष अनुसंधान क्षेत्र", href: official("SupportedAreasofResearch.html") }
    ]
  }
];

function NavTarget({ item, isHindi, children, onClick }: { item: NavItem; isHindi: boolean; children: React.ReactNode; onClick?: () => void }) {
  const external = item.external || item.href.startsWith("http");
  return external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>{children}</a>
  ) : (
    <Link href={item.href} onClick={onClick}>{children}</Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const { isHindi, setLang } = useLanguage();

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
      {/* Top Utility Bar */}
      <div className="hidden border-b border-white/10 px-6 py-2 text-[9px] uppercase tracking-[.18em] text-white/45 lg:block lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`transition-colors ${!isHindi ? "font-bold text-white" : "text-white/45 hover:text-white"}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("hi")}
              className={`transition-colors ${isHindi ? "font-bold text-ember" : "text-white/45 hover:text-white"}`}
            >
              हिंदी
            </button>
            <span>|</span>
            {utilityLinks.map((link) => (
              <span key={link.label} className="flex items-center">
                <NavTarget item={link} isHindi={isHindi}>
                  <span className="hover:text-white">
                    {isHindi && link.labelHi ? link.labelHi : link.label}
                  </span>
                </NavTarget>
                <span className="ml-3 text-white/30">|</span>
              </span>
            ))}
            <Link href="/careers" className="hover:text-white">
              {isHindi ? "करियर" : "Career"}
            </Link>
          </div>
          <span>
            {isHindi
              ? "अंतरिक्ष विभाग · भारत सरकार"
              : "Department of Space · Government of India"}
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-6 py-3 lg:px-10 lg:py-2">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8">
          <Logo />
          <div className="flex items-center gap-4">
            {/* Language Quick Toggle on Mobile */}
            <button
              type="button"
              onClick={() => setLang(isHindi ? "en" : "hi")}
              className="flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white lg:hidden"
            >
              <span className={!isHindi ? "text-ember font-bold" : "text-white/40"}>EN</span>
              <span className="text-white/30">/</span>
              <span className={isHindi ? "text-ember font-bold" : "text-white/40"}>HI</span>
            </button>

            <button
              type="button"
              onClick={() => { setSearchOpen((current) => !current); setMenuOpen(false); }}
              aria-label={searchOpen ? "Close search" : "Search"}
              className="hidden text-white/70 hover:text-white sm:block"
            >
              {searchOpen ? <X size={18} strokeWidth={1.6} /> : <Search size={17} strokeWidth={1.6} />}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative z-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.24em] text-white/75 hover:text-white"
            >
              <span className="hidden sm:block">{isHindi ? "मेनू" : "Menu"}</span>
              {menuOpen ? <X size={21} strokeWidth={1.5} /> : <Menu size={21} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/10 bg-black/95 px-6 py-5 backdrop-blur-xl lg:px-10">
            <div className="mx-auto max-w-[1440px]">
              <label className="flex items-center gap-3 border border-white/15 bg-white/[.03] px-4 py-3">
                <Search size={16} className="text-white/40" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={isHindi ? "इसरो कार्यक्रम, मिशन एवं सेवाओं में खोजें..." : "Search ISRO programmes, missions, and services"}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {navGroups.flatMap((group) => group.items).filter((item) => !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase()) || (item.labelHi && item.labelHi.includes(searchQuery))).slice(0, 8).map((item) => (
                  <NavTarget key={`${item.label}-${item.href}`} item={item} isHindi={isHindi} onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                    <span className="inline-flex rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-white/55 hover:border-ember hover:text-white">
                      {isHindi && item.labelHi ? item.labelHi : item.label}
                    </span>
                  </NavTarget>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-x-0 top-0 -z-0 flex min-h-screen flex-col justify-center overflow-y-auto bg-[#080808] px-6 py-24 lg:px-16" aria-label="ISRO navigation menu">
            <div className="mx-auto w-full max-w-[1440px]">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[.3em] text-ember">
                  {isHindi ? "इसरो अन्वेषण मेनू" : "Explore ISRO"}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-3 py-1 rounded border text-[10px] uppercase tracking-wider ${!isHindi ? "border-ember bg-ember text-white" : "border-white/20 text-white/50"}`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("hi")}
                    className={`px-3 py-1 rounded border text-[10px] uppercase tracking-wider ${isHindi ? "border-ember bg-ember text-white" : "border-white/20 text-white/50"}`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>

              <Link href="/" onClick={closeMenus} className="block border-b border-white/10 py-4 text-3xl font-medium text-white/90 hover:text-ember">
                {isHindi ? "मुख्य पृष्ठ (Home)" : "Home"}
              </Link>
              {navGroups.map((group, index) => (
                <div key={group.label} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                    aria-expanded={mobileGroup === group.label}
                    className="flex w-full items-center justify-between py-4 text-left text-3xl font-medium tracking-tighter text-white/90 hover:text-ember"
                  >
                    <span>
                      {isHindi ? group.labelHi : group.label}
                      <span className="ml-3 align-top text-sm text-white/25">0{index + 1}</span>
                    </span>
                    <ChevronDown size={20} className={`text-white/40 transition-transform ${mobileGroup === group.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileGroup === group.label && (
                    <div className="grid gap-1 pb-5 pl-2 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <NavTarget key={item.label} item={item} isHindi={isHindi} onClick={closeMenus}>
                          <span className="block py-2 text-sm text-white/55 hover:text-ember">
                            {isHindi && item.labelHi ? item.labelHi : item.label}
                          </span>
                        </NavTarget>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
