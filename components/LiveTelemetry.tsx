"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SatelliteTelemetry {
  latitude: number;
  longitude: number;
  velocity: number;
}

interface IssApiResponse {
  latitude: number;
  longitude: number;
  velocity: number;
}

const FALLBACK_TELEMETRY: SatelliteTelemetry = {
  latitude: 13.18,
  longitude: 80.08,
  velocity: 0
};

const ISS_ENDPOINT = "https://api.wheretheiss.at/v1/satellites/25544";

function formatCoordinate(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? positive : negative}`;
}

export function LiveTelemetry() {
  const [telemetry, setTelemetry] = useState<SatelliteTelemetry>(FALLBACK_TELEMETRY);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchTelemetry = async () => {
      try {
        const response = await fetch(ISS_ENDPOINT, { cache: "no-store" });
        if (!response.ok) throw new Error(`Telemetry request failed: ${response.status}`);

        const data = (await response.json()) as IssApiResponse;
        if (cancelled || !Number.isFinite(data.latitude) || !Number.isFinite(data.longitude) || !Number.isFinite(data.velocity)) return;

        setTelemetry({ latitude: data.latitude, longitude: data.longitude, velocity: data.velocity });
        setIsLive(true);
      } catch {
        if (!cancelled) setIsLive(false);
      }
    };

    void fetchTelemetry();
    const intervalId = window.setInterval(() => void fetchTelemetry(), 3000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex min-w-0 flex-col gap-2 text-[9px] uppercase tracking-[.18em] text-white/55 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex items-center gap-2 whitespace-nowrap text-white/70">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.12, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-400" : "bg-amber-300"}`}
        />
        <span>Live telemetry: LEO orbit</span>
      </div>
      <span className="hidden h-px w-10 bg-white/25 sm:block" />
      <span className="whitespace-nowrap">
        {formatCoordinate(telemetry.latitude, "N", "S")} / {formatCoordinate(telemetry.longitude, "E", "W")}
      </span>
      <span className="whitespace-nowrap text-white/40">{telemetry.velocity ? `${Math.round(telemetry.velocity).toLocaleString()} km/h` : "Awaiting signal"}</span>
    </div>
  );
}
