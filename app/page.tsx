import { Hero } from "@/components/Hero";
import { MissionSection, type Mission } from "@/components/MissionSection";
import { Navbar } from "@/components/layout/Navbar";
import { Updates } from "@/components/Updates";
import { Footer } from "@/components/layout/Footer";
import { isroImages } from "@/src/constants/images";
import { NavicTelemetryWidget } from "@/components/widgets/NavicTelemetryWidget";
import { GeospatialHub } from "@/components/sections/GeospatialHub";
import { IsroCentersMap } from "@/components/sections/IsroCentersMap";
import { TechTransferGateway } from "@/components/sections/TechTransferGateway";

const missions: Mission[] = [
  { number: "01", eyebrow: "Human spaceflight · 18 OCT 2023", title: "The next giant leap is ours.", description: "Gaganyaan is India’s first crewed orbital mission. A journey that carries our curiosity, our courage, and a billion dreams into the stars.", image: isroImages.gaganyaanTvD1Launch, alt: "Gaganyaan vehicle used for the TV-D1 mission" },
  { number: "02", eyebrow: "Lunar exploration · 23 AUG 2023", title: "We found a new way to look at the Moon.", description: "Chandrayaan-3 touched down softly on the lunar south pole, making history and opening the door to a deeper understanding of our closest celestial neighbour.", image: isroImages.chandrayaan3VikramLander, alt: "Chandrayaan-3 Vikram lander on the Moon", align: "right" },
  { number: "03", eyebrow: "Solar science · 02 SEP 2023", title: "A closer look at our star.", description: "Aditya-L1 is India’s first space-based observatory to study the Sun. From its vantage point, it watches the forces that shape our cosmic weather.", image: isroImages.adityaL1Launch, alt: "PSLV launch carrying Aditya-L1" }
];

export default function Home() { return <main className="overflow-x-hidden bg-black"><Navbar /><Hero /><section className="bg-black px-6 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid grid-cols-1 max-w-[1440px] gap-12 lg:grid-cols-[1fr_360px] lg:items-end"><p className="max-w-3xl text-3xl font-medium leading-tight tracking-tighter text-white/85 md:text-5xl">We don’t just explore space.<br /><span className="text-white/35">We expand what is possible here on Earth.</span></p><NavicTelemetryWidget /></div></section><div>{missions.map((mission) => <MissionSection key={mission.number} mission={mission} />)}</div><GeospatialHub /><IsroCentersMap /><TechTransferGateway /><Updates /><Footer /></main>; }
