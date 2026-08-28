"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, MapPin, Radio } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface IsroCenter {
  code: string;
  city: string;
  name: string;
  description: string;
  coordinates: string;
  image: string;
  facilityType: string;
}

const centers: IsroCenter[] = [
  {
    code: "URSC",
    city: "Bengaluru",
    name: "U R Rao Satellite Centre",
    description: "Satellite design, cleanroom integration, payload assembly, and testing for India’s space missions.",
    coordinates: "12.99° N / 77.66° E",
    image: "/images/centers/ursc.jpg",
    facilityType: "Satellite Fabrication & Integration",
  },
  {
    code: "VSSC",
    city: "Thiruvananthapuram",
    name: "Vikram Sarabhai Space Centre",
    description: "Launch vehicle technology, rocket propulsion research, and space transportation systems.",
    coordinates: "8.52° N / 76.94° E",
    image: "/images/centers/vssc.jpg",
    facilityType: "Rocket Propulsion & Launch Vehicles",
  },
  {
    code: "SDSC SHAR",
    city: "Sriharikota",
    name: "Satish Dhawan Space Centre",
    description: "India’s primary spaceport and orbital launch complex on the Bay of Bengal coastline.",
    coordinates: "13.72° N / 80.23° E",
    image: "/images/centers/sdsc-shar.jpg",
    facilityType: "Spaceport & Launch Operations",
  },
  {
    code: "SAC",
    city: "Ahmedabad",
    name: "Space Applications Centre",
    description: "Space sensors, payloads, microwave radars, communication systems, and applications research.",
    coordinates: "23.03° N / 72.54° E",
    image: "/images/centers/sac.jpg",
    facilityType: "Payload & Sensor Laboratories",
  },
  {
    code: "NRSC",
    city: "Hyderabad",
    name: "National Remote Sensing Centre",
    description: "Satellite data reception, Shadnagar earth station dish antenna arrays, and geospatial intelligence.",
    coordinates: "17.45° N / 78.38° E",
    image: "/images/centers/nrsc.jpg",
    facilityType: "Earth Observation & Data Reception",
  },
  {
    code: "ISTRAC",
    city: "Bengaluru",
    name: "ISRO Telemetry Tracking & Command Network",
    description: "Telemetry, tracking, deep space network antenna arrays, and interplanetary mission operations.",
    coordinates: "13.02° N / 77.57° E",
    image: "/images/centers/istrac.jpg",
    facilityType: "Deep Space Network & MOX",
  },
];

export function IsroCentersMap() {
  const [active, setActive] = useState(centers[0]);

  return (
    <section className="bg-black px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14">
          <p className="mb-5 text-[10px] uppercase tracking-[.32em] text-ember">
            A national footprint
          </p>
          <h2 className="text-5xl font-medium tracking-tighter md:text-7xl">
            Where the work happens.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[.75fr_1.25fr]">
          {/* Left list selector */}
          <div className="flex flex-col border border-white/10 bg-white/[.02] p-2 backdrop-blur-md">
            {centers.map((center) => {
              const isSelected = active.code === center.code;
              return (
                <button
                  type="button"
                  key={center.code}
                  onClick={() => setActive(center)}
                  aria-pressed={isSelected}
                  className={`group relative flex w-full items-center justify-between overflow-hidden border-b border-white/10 px-4 py-5 text-left transition-all last:border-0 ${
                    isSelected ? "bg-white/[.07]" : "hover:bg-white/[.03]"
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    {/* Thumbnail preview */}
                    <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded border border-white/15">
                      <Image
                        src={center.image}
                        alt={center.name}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <span
                        className={`block text-sm font-bold tracking-tight transition-colors ${
                          isSelected ? "text-ember" : "text-white/80 group-hover:text-white"
                        }`}
                      >
                        {center.code}
                      </span>
                      <span className="mt-0.5 block text-xs text-white/40">
                        {center.city}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className={`relative z-10 transition-all ${
                      isSelected
                        ? "text-ember translate-x-0.5 -translate-y-0.5"
                        : "text-white/25 group-hover:text-white/60"
                    }`}
                  />

                  {/* Active highlight bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCenterIndicator"
                      className="absolute inset-y-0 left-0 w-1 bg-ember"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right cinematic showcase card */}
          <div className="relative min-h-[480px] overflow-hidden rounded-2xl border border-white/15 bg-[#08080a] p-7 md:min-h-[580px] md:p-12">
            {/* Background Image with Crossfade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.code}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                />

                {/* Multilayer Gradients for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
              </motion.div>
            </AnimatePresence>

            {/* Grid overlay for aerospace telemetry look */}
            <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:48px_48px]" />

            {/* Radar / Beacon Node Pulse in top right */}
            <div className="pointer-events-none absolute right-8 top-8 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                Live Node
              </span>
            </div>

            {/* Center Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex h-full flex-col justify-end"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-ember/40 bg-ember/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.24em] text-ember">
                    {active.code} · {active.city}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/[.05] px-3 py-1 text-[10px] font-medium tracking-wider text-white/60 backdrop-blur-sm">
                    {active.facilityType}
                  </span>
                </div>

                <h3 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tighter text-white md:text-6xl">
                  {active.name}
                </h3>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-base">
                  {active.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-white/50">
                    <MapPin size={15} className="text-ember" />
                    {active.coordinates}
                  </p>
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-white/40">
                    <Radio size={14} className="text-cyan-400" />
                    ISRO Primary Facility
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

