"use client";

import { motion } from "framer-motion";
import { Radio, Satellite } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";

export function NavicTelemetryWidget() {
  const [time, setTime] = useState("");
  const { isHindi } = useLanguage();

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(new Date())
      );
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="border border-white/10 bg-white/[.03] p-5 backdrop-blur-md">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="mb-2 text-[9px] uppercase tracking-[.26em] text-ember">
            {isHindi ? "लाइव टेलीमेट्री" : "Live telemetry"}
          </p>
          <p className="font-mono text-3xl tracking-tight text-white">
            {time || "--:--:--"} <span className="text-sm text-white/45">{isHindi ? "भारतीय मानक समय" : "IST"}</span>
          </p>
        </div>
        <Satellite size={20} className="text-blue-400" />
      </div>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <Radio size={16} className="text-emerald-400" />
        <div className="flex-1">
          <p className="text-xs text-white/80">
            {isHindi ? "नाविक प्रणाली: 7/7 उपग्रह पूर्णतः सक्रिय" : "NavIC System: 7/7 Satellites Operational"}
          </p>
          <p className="mt-1 text-[10px] text-white/40">
            {isHindi ? "सभी उपग्रह परमाणु घड़ियों से समकालिक हैं" : "All nodes synced to atomic standard"}
          </p>
        </div>
        <div className="flex items-end gap-0.5" aria-label="NavIC signal strength">
          <motion.i animate={{ height: [5, 13, 7, 16, 9] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1 rounded-full bg-blue-400" />
          <motion.i animate={{ height: [12, 6, 16, 8, 14] }} transition={{ duration: 1.1, repeat: Infinity }} className="w-1 rounded-full bg-blue-400/80" />
          <motion.i animate={{ height: [7, 15, 9, 5, 13] }} transition={{ duration: 0.9, repeat: Infinity }} className="w-1 rounded-full bg-blue-400/60" />
        </div>
      </div>
    </div>
  );
}
