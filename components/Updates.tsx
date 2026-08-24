import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { isroImages } from "@/src/constants/images";

const updates = [
  { date: "14 AUG 2026", title: "ISRO and NASA sign landmark earth observation agreement", image: isroImages.adityaL1Launch, alt: "Aditya-L1 launch on PSLV" },
  { date: "02 AUG 2026", title: "SSLV-D3 completes its mission with precision", image: isroImages.lvm3Liftoff, alt: "LVM3 lifting off from Sriharikota" },
  { date: "18 AUG 2026", title: "A new chapter in India’s human spaceflight programme", image: isroImages.gaganyaanTvD1Launch, alt: "Gaganyaan TV-D1 launch vehicle" }
];

const inlineLinkClass = "inline-flex items-center gap-1 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors";

export function Updates() {
  return <section className="bg-black px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1440px]"><div className="mb-14 flex items-end justify-between"><div><p className="mb-5 text-[10px] uppercase tracking-[.3em] text-ember">The signal</p><h2 className="text-5xl font-medium tracking-tighter md:text-7xl">Latest updates</h2></div><a href="#footer" className="hidden items-center gap-3 text-[10px] uppercase tracking-[.2em] text-white/55 transition-colors hover:text-white sm:flex">View all news <ArrowUpRight size={15} /></a></div><div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-3">{updates.map((item) => <article key={item.date} className="group flex h-full flex-col justify-between bg-white/[.03] pb-8"><div><div className="relative mb-7 aspect-[1.45] overflow-hidden rounded-xl"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" /></div><div className="px-1"><p className="mb-5 text-[10px] uppercase tracking-[.25em] text-white/35">{item.date}</p><h3 className="max-w-sm text-2xl font-medium leading-tight tracking-tight text-white/90">{item.title}</h3></div></div><a href="#footer" className={`${inlineLinkClass} mt-8 px-1`}>Read story <ArrowUpRight size={13} /></a></article>)}</div></div></section>;
}
