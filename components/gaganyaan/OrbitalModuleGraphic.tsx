"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { isroImages } from "@/src/constants/images";

export function OrbitalModuleGraphic({ accent }: { accent: "orange" | "blue" | "white" }) {
  const colors = { orange: "#ff5c35", blue: "#60a5fa", white: "#e5e7eb" };
  return <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0b0d11] lg:min-h-[620px]">
    <Image src={isroImages.gaganyaanCrewModule} alt="Gaganyaan crew module used during the Pad Abort Test" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover opacity-25" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d11] via-[#0b0d11]/45 to-transparent" />
    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:45px_45px]" />
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute h-[70%] w-[70%] rounded-full border border-dashed border-white/15">
      <div className="absolute -right-1.5 top-1/2 h-3 w-3 rounded-full" style={{ backgroundColor: colors[accent], boxShadow: `0 0 24px ${colors[accent]}` }} />
    </motion.div>
    <motion.div initial={{ scale: .9 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: .8 }} className="relative h-48 w-64">
      <div className="absolute left-8 top-8 h-32 w-48 rounded-[48%] border-2 bg-gradient-to-br from-white/15 to-transparent" style={{ borderColor: `${colors[accent]}aa`, boxShadow: `0 0 45px ${colors[accent]}20` }} />
      <div className="absolute left-16 top-2 h-14 w-32 rounded-t-[70%] border-2 border-b-0 bg-white/5" style={{ borderColor: `${colors[accent]}70` }} />
      <div className="absolute bottom-2 left-16 h-14 w-32 rounded-b-[70%] border-2 border-t-0 bg-white/5" style={{ borderColor: `${colors[accent]}70` }} />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: colors[accent] }} />
    </motion.div>
    <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[.24em] text-white/35">Orbital module / 01</span>
    <span className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[.24em] text-white/35">Design study</span>
  </div>;
}
