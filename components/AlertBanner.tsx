"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ALERT_HEIGHT = "40px";

export function AlertBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty("--isro-alert-offset", visible ? ALERT_HEIGHT : "0px");
    return () => { document.documentElement.style.removeProperty("--isro-alert-offset"); };
  }, [visible]);

  return <AnimatePresence>{visible && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .22 }} className="fixed inset-x-0 top-0 z-[70] overflow-hidden border-b border-orange-300/20 bg-[#54160d] text-white"><div className="mx-auto flex min-h-10 max-w-[1440px] items-center justify-center gap-2 px-12 py-2 text-center text-[10px] font-semibold uppercase tracking-[.14em] sm:text-[11px]"><span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-orange-200" /></span><span>DISASTER MANAGEMENT SUPPORT: Real-time Cyclone Tracking and Flood Inundation mapping now available on Bhuvan NDEM.</span><button onClick={() => setVisible(false)} aria-label="Dismiss alert" className="absolute right-4 text-orange-100/70 transition-colors hover:text-white sm:right-7"><X size={15} /></button></div></motion.div>}</AnimatePresence>;
}
