"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Globe, MapPin, Radio, Rocket, Satellite, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { isroImages } from "@/src/constants/images";
import { useLanguage } from "@/src/context/LanguageContext";

const hindiMissions = [
  {
    title: "गगनयान मिशन",
    code: "Gaganyaan",
    desc: "भारत का पहला मानव अंतरिक्ष उड़ान कार्यक्रम। 3 अंतरिक्ष यात्रियों को 400 किमी की कक्षा में 3 दिनों के लिए भेजना और सुरक्षित वापसी।",
    link: "/missions/gaganyaan",
    tag: "मानव अंतरिक्ष उड़ान"
  },
  {
    title: "चंद्रयान-3",
    code: "Chandrayaan-3",
    desc: "चंद्रमा के दक्षिणी ध्रुवीय क्षेत्र पर सफल सॉफ्ट लैंडिंग और प्रज्ञान रोवर का ऐतिहासिक अन्वेषण।",
    link: "/",
    tag: "चंद्र अन्वेषण"
  },
  {
    title: "आदित्य-एल1",
    code: "Aditya-L1",
    desc: "सूर्य-पृथ्वी एल1 बिंदु पर स्थापित भारत की पहली अंतरिक्ष-आधारित सौर वेधशाला।",
    link: "/",
    tag: "सौर भौतिकी"
  }
];

const hindiServices = [
  {
    title: "युविका (YUVIKA)",
    desc: "कक्षा 9 के विद्यार्थियों के लिए युवा वैज्ञानिक कार्यक्रम। अंतरिक्ष विज्ञान एवं प्रौद्योगिकी का प्रत्यक्ष अनुभव।",
    link: "/careers",
    tag: "छात्र कार्यक्रम"
  },
  {
    title: "भुवन भू-स्थानिक पोर्टल",
    desc: "उपग्रह चित्रों, कृषि अनुश्रवण, बाढ़ प्रबंधन और राष्ट्रीय विकास हेतु मुफ़्त भू-स्थानिक डेटा।",
    link: "/#geospatial",
    tag: "भू-स्थानिक सेवा"
  },
  {
    title: "कैरियर एवं इंटर्नशिप",
    desc: "वैज्ञानिक/इंजीनियर भर्ती (ICRB), स्नातक इंटर्नशिप और अनुसंधान अध्येतावृत्ति (Fellowships)।",
    link: "/careers",
    tag: "कैरियर"
  },
  {
    title: "प्रौद्योगिकी हस्तांतरण (IN-SPACe)",
    desc: "भारतीय अंतरिक्ष स्टार्ट-अप और निजी उद्योग के साथ इसरो की उन्नत तकनीकों का आदान-प्रदान।",
    link: "/#tech-transfer",
    tag: "उद्योग"
  }
];

export default function HindiPage() {
  const { setLang } = useLanguage();

  useEffect(() => {
    setLang("hi");
  }, [setLang]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden border-b border-white/10 px-6 pb-16 pt-44 lg:px-10 lg:pb-24">
        <Image
          src={isroImages.lvm3Liftoff}
          alt="इसरो एलवीएम3 रॉकेट प्रक्षेपण"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

        <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[.25em] text-ember backdrop-blur-md">
            <Globe size={13} />
            भारतीय अंतरिक्ष अनुसंधान संगठन · भारत सरकार
          </div>

          <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,7rem)] font-bold leading-[1.05] tracking-tight">
            मानव जाति की सेवा में<br />
            <span className="text-white/50">अंतरिक्ष प्रौद्योगिकी।</span>
          </h1>

          <div className="mt-10 flex flex-col justify-between gap-8 text-sm text-white/60 md:flex-row md:items-end">
            <p className="max-w-xl leading-7 text-base font-light text-white/75">
              इसरो का उद्देश्य राष्ट्र के विकास के लिए अंतरिक्ष विज्ञान और प्रौद्योगिकी का उपयोग करना है। उपग्रह संचार से लेकर गहन अंतरिक्ष अन्वेषण तक, भारत आत्मनिर्भरता के पथ पर अग्रसर है।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 bg-ember px-6 py-4 text-[11px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:bg-[#ff7654]"
              >
                सम्पूर्ण साइट हिंदी में देखें <ArrowUpRight size={16} />
              </Link>
              <a
                href="#missions"
                className="flex items-center gap-3 border border-white/20 px-6 py-4 text-[11px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:border-white/50"
              >
                प्रमुख मिशन <ArrowDown size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Major Missions Section */}
      <section id="missions" className="border-b border-white/10 bg-black px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ember">01 / राष्ट्रीय अंतरिक्ष अभियान</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-5xl">प्रमुख भारतीय अंतरिक्ष मिशन</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/50">
              मानव अंतरिक्ष उड़ान और चंद्र-सौर अन्वेषण में भारत के मील के पत्थर।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {hindiMissions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex flex-col justify-between border border-white/10 bg-white/[.02] p-8 transition-colors hover:border-ember/50 hover:bg-white/[.04]"
              >
                <div>
                  <span className="mb-4 inline-block rounded-full border border-white/15 bg-white/[.05] px-3 py-1 text-[10px] uppercase tracking-wider text-white/60">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-medium text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{item.desc}</p>
                </div>
                <Link
                  href={item.link}
                  className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ember transition-transform group-hover:translate-x-1"
                >
                  विस्तार से पढ़ें <ArrowUpRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Citizen & Student Services */}
      <section className="border-b border-white/10 bg-black px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[.28em] text-ember">02 / नागरिक एवं छात्र सेवाएं</p>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">राष्ट्र और समाज के लिए सेवाएं</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hindiServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col justify-between border border-white/10 bg-white/[.02] p-6 transition-colors hover:border-white/30"
              >
                <div>
                  <span className="mb-3 inline-block text-[10px] uppercase tracking-widest text-ember font-mono">{service.tag}</span>
                  <h3 className="text-lg font-medium text-white">{service.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-white/55">{service.desc}</p>
                </div>
                <Link
                  href={service.link}
                  className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/70 hover:text-ember"
                >
                  पोर्टल खोलें <ArrowUpRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Quote Banner */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black px-6 py-20 lg:px-10 lg:py-28">
        <Image
          src="/images/thumba-rocket-bicycle.jpg"
          alt="थुम्बा 1963 ऐतिहासिक प्रक्षेपण"
          fill
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <blockquote className="text-xl font-light leading-relaxed text-white/90 md:text-3xl">
              “जो कोलाहल के बीच भी संगीत सुन सकता है, वह महान कार्य कर सकता है।”
            </blockquote>
            <p className="mt-4 font-mono text-xs uppercase tracking-[.25em] text-white/50">
              — डॉ. विक्रम साराभाई (संस्थापक, भारतीय अंतरिक्ष कार्यक्रम)
            </p>
          </div>
          <Link
            href="/"
            className="flex w-fit items-center gap-3 border border-white/30 bg-black/60 px-6 py-4 text-[11px] font-bold uppercase tracking-[.2em] text-white backdrop-blur-md transition-colors hover:border-ember hover:bg-ember"
          >
            English Portal <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
