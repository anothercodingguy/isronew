"use client";

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
import { useLanguage } from "@/src/context/LanguageContext";

const missionsEn: Mission[] = [
  {
    number: "01",
    eyebrow: "Human spaceflight · 18 OCT 2023",
    title: "The next giant leap is ours.",
    description: "Gaganyaan is India’s first crewed orbital mission. A journey that carries our curiosity, our courage, and a billion dreams into the stars.",
    image: isroImages.gaganyaanTvD1Launch,
    alt: "Gaganyaan vehicle used for the TV-D1 mission"
  },
  {
    number: "02",
    eyebrow: "Lunar exploration · 23 AUG 2023",
    title: "We found a new way to look at the Moon.",
    description: "Chandrayaan-3 touched down softly on the lunar south pole, making history and opening the door to a deeper understanding of our closest celestial neighbour.",
    image: isroImages.chandrayaan3VikramLander,
    alt: "Chandrayaan-3 Vikram lander on the Moon",
    align: "right"
  },
  {
    number: "03",
    eyebrow: "Solar science · 02 SEP 2023",
    title: "A closer look at our star.",
    description: "Aditya-L1 is India’s first space-based observatory to study the Sun. From its vantage point, it watches the forces that shape our cosmic weather.",
    image: isroImages.adityaL1Launch,
    alt: "PSLV launch carrying Aditya-L1"
  }
];

const missionsHi: Mission[] = [
  {
    number: "01",
    eyebrow: "मानव अंतरिक्ष उड़ान · 18 अक्टूबर 2023",
    title: "अगली महान छलांग हमारी है।",
    description: "गगनयान भारत का पहला मानव कक्षीय मिशन है। एक ऐसी यात्रा जो हमारी जिज्ञासा, हमारे साहस और 140 करोड़ सपनों को सितारों तक ले जाती है।",
    image: isroImages.gaganyaanTvD1Launch,
    alt: "गगनयान टीवी-डी1 परीक्षण यान"
  },
  {
    number: "02",
    eyebrow: "चंद्र अन्वेषण · 23 अगस्त 2023",
    title: "हमने चंद्रमा को देखने का नया मार्ग खोजा।",
    description: "चंद्रयान-3 ने चंद्रमा के दक्षिणी ध्रुवीय क्षेत्र पर सफल सॉफ्ट लैंडिंग कर इतिहास रचा और हमारे निकटतम खगोलीय पड़ोसी को समझने के नए द्वार खोले।",
    image: isroImages.chandrayaan3VikramLander,
    alt: "चंद्रयान-3 विक्रम लैंडर चंद्रमा पर",
    align: "right"
  },
  {
    number: "03",
    eyebrow: "सौर भौतिकी · 02 सितंबर 2023",
    title: "हमारे सौर तारे का निकटतम अध्ययन।",
    description: "आदित्य-एल1 सूर्य का अध्ययन करने वाली भारत की पहली अंतरिक्ष-आधारित सौर वेधशाला है। यह पृथ्वी के अंतरिक्ष मौसम को आकार देने वाली सौर शक्तियों पर निरंतर नज़र रखती है।",
    image: isroImages.adityaL1Launch,
    alt: "आदित्य-एल1 को ले जाता पीएसएलवी रॉकेट"
  }
];

export default function Home() {
  const { isHindi } = useLanguage();
  const activeMissions = isHindi ? missionsHi : missionsEn;

  return (
    <main className="home-page overflow-x-hidden bg-black text-white">
      <Navbar />
      <Hero />

      {/* Philosophy Section */}
      <section className="bg-black px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <p className="max-w-3xl text-3xl font-medium leading-tight tracking-tighter text-white/85 md:text-5xl">
            {isHindi ? (
              <>
                हम केवल अंतरिक्ष का अन्वेषण नहीं करते।<br />
                <span className="text-white/35">हम पृथ्वी पर संभावनाओं का विस्तार करते हैं।</span>
              </>
            ) : (
              <>
                We don’t just explore space.<br />
                <span className="text-white/35">We expand what is possible here on Earth.</span>
              </>
            )}
          </p>
          <NavicTelemetryWidget />
        </div>
      </section>

      {/* Missions */}
      <div id="missions">
        {activeMissions.map((mission) => (
          <MissionSection key={mission.number} mission={mission} />
        ))}
      </div>

      <GeospatialHub />
      <IsroCentersMap />
      <TechTransferGateway />
      <Updates />
      <Footer />
    </main>
  );
}
