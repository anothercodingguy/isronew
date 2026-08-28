"use client";

import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Twitter, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "@/src/context/LanguageContext";

interface FooterLink {
  label: string;
  labelHi?: string;
  href: string;
  external?: boolean;
}

const columns: { title: string; titleHi: string; links: FooterLink[] }[] = [
  {
    title: "Governance",
    titleHi: "प्रशासन एवं सूचना",
    links: [
      { label: "Right to Information (RTI)", labelHi: "सूचना का अधिकार (RTI)", href: "/rti" },
      { label: "Citizen Charter", labelHi: "नागरिक घोषणापत्र", href: "/feedback" },
      { label: "Citizen Feedback", labelHi: "नागरिक प्रतिक्रिया", href: "/feedback" },
      { label: "Contact Directory", labelHi: "संपर्क निर्देशिका", href: "/contact" }
    ]
  },
  {
    title: "Data & Services",
    titleHi: "डेटा एवं भू-स्थानिक",
    links: [
      { label: "Bhuvan Geoportal", labelHi: "भुवन भू-स्थानिक पोर्टल", href: "https://bhuvan.nrsc.gov.in/", external: true },
      { label: "Bhoonidhi Open Data", labelHi: "भूनिधि उपग्रह डेटा", href: "https://bhoonidhi.nrsc.gov.in/", external: true },
      { label: "MOSDAC Weather", labelHi: "मोसडैक मौसम विज्ञान", href: "https://mosdac.gov.in/", external: true },
      { label: "Tenders & e-Procurement", labelHi: "निविदाएं एवं खरीद", href: "/tenders" }
    ]
  },
  {
    title: "Engagement",
    titleHi: "छात्र एवं आउटरीच",
    links: [
      { label: "YUVIKA 2026", labelHi: "युविका युवा वैज्ञानिक", href: "/careers" },
      { label: "Student Satellites", labelHi: "छात्र उपग्रह कार्यक्रम", href: "https://www.isro.gov.in/Student_Program_Satellite.html", external: true },
      { label: "Frequently Asked Questions", labelHi: "सामान्य प्रश्न (FAQ)", href: "/faq" },
      { label: "Complete Sitemap", labelHi: "सम्पूर्ण साइटमैप", href: "/sitemap" }
    ]
  }
];

function FooterLinkItem({ link, isHindi }: { link: FooterLink; isHindi: boolean }) {
  const classes = "inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white";
  const text = isHindi && link.labelHi ? link.labelHi : link.label;
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
      {text}
      <ArrowUpRight size={12} />
    </a>
  ) : (
    <Link href={link.href} className={classes}>
      {text}
    </Link>
  );
}

export function Footer() {
  const { isHindi } = useLanguage();

  return (
    <footer id="footer" className="border-t border-white/10 bg-black px-6 pb-8 pt-20 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Logo />
            <p className="mt-8 max-w-xs text-sm leading-7 text-neutral-400">
              {isHindi
                ? "भारतीय अंतरिक्ष अनुसंधान संगठन · अंतरिक्ष विभाग, भारत सरकार।"
                : "Indian Space Research Organisation · Department of Space, Government of India."}
            </p>
            <div className="mt-8 flex gap-4 text-neutral-400">
              <a href="https://www.instagram.com/isro.dos/" target="_blank" rel="noopener noreferrer" aria-label="ISRO Instagram" className="hover:text-white"><Instagram size={17} /></a>
              <a href="https://x.com/isro" target="_blank" rel="noopener noreferrer" aria-label="ISRO X" className="hover:text-white"><Twitter size={17} /></a>
              <a href="https://www.youtube.com/channel/UCw5hEVOTfz_AfzsNFWyNlNg" target="_blank" rel="noopener noreferrer" aria-label="ISRO YouTube" className="hover:text-white"><Youtube size={17} /></a>
              <a href="https://www.linkedin.com/company/indian-space-research-organisation/" target="_blank" rel="noopener noreferrer" aria-label="ISRO LinkedIn" className="hover:text-white"><Linkedin size={17} /></a>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[.25em] text-ember">
                {isHindi ? column.titleHi : column.title}
              </h3>
              <div className="flex flex-col items-start gap-4">
                {column.links.map((link) => (
                  <FooterLinkItem key={link.label} link={link} isHindi={isHindi} />
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[.25em] text-ember">
              {isHindi ? "मुख्यालय" : "Headquarters"}
            </h3>
            <p className="flex gap-3 text-sm leading-6 text-neutral-400">
              <MapPin size={17} className="mt-1 shrink-0 text-white/50" />
              <span>
                {isHindi ? (
                  <>
                    अंतरिक्ष भवन<br />
                    न्यू बीईएल रोड<br />
                    बेंगलुरु 560094<br />
                    कर्नाटक, भारत
                  </>
                ) : (
                  <>
                    Antariksh Bhavan<br />
                    New BEL Road<br />
                    Bengaluru 560094<br />
                    Karnataka, India
                  </>
                )}
              </span>
            </p>
            <a href="mailto:contactus@isro.gov.in" className="mt-5 flex items-center gap-3 text-sm text-neutral-400 hover:text-white">
              <Mail size={16} className="text-white/50" />contactus@isro.gov.in
            </a>
            <Link href="/media-kit" className="mt-5 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors">
              {isHindi ? "प्रेस मीडिया किट" : "Press Media Kit"} <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[.18em] text-neutral-500 sm:flex-row">
          <span>
            {isHindi
              ? "© 2026 भारतीय अंतरिक्ष अनुसंधान संगठन · भारत सरकार"
              : "© 2026 ISRO · Government of India"}
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {isHindi ? "उपयोग की शर्तें" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
