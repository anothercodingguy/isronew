import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { GaganyaanHero } from "@/components/gaganyaan/GaganyaanHero";
import { HLVM3Featurette } from "@/components/gaganyaan/HLVM3Featurette";
import { MissionObjective } from "@/components/gaganyaan/MissionObjective";
import { MissionTimeline } from "@/components/gaganyaan/MissionTimeline";
import { ModuleExplorer } from "@/components/gaganyaan/ModuleExplorer";

export const metadata: Metadata = { title: "Gaganyaan — ISRO", description: "India's human spaceflight programme." };

export default function GaganyaanPage() {
  return <main className="bg-black"><Navbar /><GaganyaanHero /><MissionObjective /><ModuleExplorer /><MissionTimeline /><HLVM3Featurette /><Footer /></main>;
}
