import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function MediaKitPage() {
  return <main className="min-h-screen bg-black text-white"><Navbar /><article className="mx-auto max-w-3xl px-6 pb-24 pt-48 lg:px-10"><p className="mb-5 text-[10px] uppercase tracking-[.3em] text-ember">Press and media</p><h1 className="text-5xl font-medium tracking-tighter md:text-7xl">Media kit</h1><p className="mt-8 text-sm leading-7 text-white/60">For official press releases, imagery, and media enquiries, visit the <a className="text-white underline underline-offset-4" href="https://www.isro.gov.in/" target="_blank" rel="noopener noreferrer">official ISRO website</a> or contact the ISRO communications team.</p><a className="mt-8 inline-flex border border-white/30 px-5 py-4 text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-ember hover:bg-ember" href="mailto:contactus@isro.gov.in">Contact communications</a></article><Footer /></main>;
}
