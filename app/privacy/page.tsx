import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPage() {
  return <main className="min-h-screen bg-black text-white"><Navbar /><article className="mx-auto max-w-3xl px-6 pb-24 pt-48 lg:px-10"><p className="mb-5 text-[10px] uppercase tracking-[.3em] text-ember">Institutional information</p><h1 className="text-5xl font-medium tracking-tighter md:text-7xl">Privacy policy</h1><p className="mt-8 text-sm leading-7 text-white/60">This demonstration site does not require an account or collect personal information for browsing. Interactive forms and the Citizen Space Agent should be treated as prototype features for the civic technology demonstration.</p><p className="mt-5 text-sm leading-7 text-white/60">For official ISRO privacy and data practices, please refer to the <a className="text-white underline underline-offset-4" href="https://www.isro.gov.in/" target="_blank" rel="noopener noreferrer">official ISRO website</a>.</p></article><Footer /></main>;
}
