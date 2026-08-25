import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function TermsPage() {
  return <main className="min-h-screen bg-black text-white"><Navbar /><article className="mx-auto max-w-3xl px-6 pb-24 pt-48 lg:px-10"><p className="mb-5 text-[10px] uppercase tracking-[.3em] text-ember">Institutional information</p><h1 className="text-5xl font-medium tracking-tighter md:text-7xl">Terms of use</h1><p className="mt-8 text-sm leading-7 text-white/60">This site is a civic technology demonstration and is not an official application, recruitment, or mission-control portal. Information is presented for public education and should be verified through official ISRO channels.</p><p className="mt-5 text-sm leading-7 text-white/60">Use of official external portals linked from this site is governed by the terms and policies of those portals.</p></article><Footer /></main>;
}
