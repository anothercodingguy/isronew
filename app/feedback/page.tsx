"use client";

import { motion } from "framer-motion";
import { CheckCircle2, HeartHandshake, MessageSquare, Send, Sparkles, Star } from "lucide-react";
import { FormEvent, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("Website Usability & Experience");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    const newRef = `ISRO-FDBK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefId(newRef);
    setSubmitted(true);
  };

  const handleDemoFill = () => {
    setName("Aarav Sharma");
    setEmail("aarav.sharma@students.ac.in");
    setRating(5);
    setCategory("Careers & YUVIKA Student Journey");
    setFeedback("The DigiLocker e-KYC sandbox and instant application status tracker make applying to ISRO student programmes so much faster and more transparent than downloading static PDFs. Keep expanding this digital portal!");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Header */}
      <section className="border-b border-white/10 px-6 pb-16 pt-40 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[10px] uppercase tracking-[.3em] text-ember">
            Citizen Voice · Continuous Improvement
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-7xl">
            Feedback & Insights.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 md:text-base">
            Help us refine digital space services, open scientific datasets, student outreach programmes, and public interfaces for citizens across India.
          </p>
        </div>
      </section>

      {/* Feedback Form & Charter Section */}
      <section className="border-b border-white/10 px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Form */}
          <div className="border border-white/10 bg-white/[.02] p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[.25em] text-ember">Citizen Experience Survey</p>
                <h2 className="text-2xl font-medium text-white">Share Your Feedback</h2>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-[10px] uppercase tracking-wider text-ember transition-colors hover:bg-ember hover:text-white"
              >
                ⚡ Quick Demo Fill
              </button>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={32} />
                </span>
                <h3 className="mt-6 text-2xl font-medium text-white">Thank You for Your Feedback</h3>
                <p className="mt-2 text-sm text-white/60">
                  Your input has been recorded in our product engineering feedback pipeline.
                </p>
                <div className="mt-6 inline-block rounded-lg border border-white/20 bg-white/[.05] px-6 py-3 font-mono text-base font-bold text-ember">
                  {refId}
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setFeedback(""); }}
                    className="border border-white/20 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white hover:border-white/50"
                  >
                    Submit Another Feedback
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-sm">
                
                {/* Rating */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Overall Experience Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`flex h-10 w-10 items-center justify-center rounded border transition-colors ${
                          rating >= star
                            ? "border-ember bg-ember/20 text-ember"
                            : "border-white/10 bg-white/[.02] text-white/30 hover:border-white/30"
                        }`}
                      >
                        <Star size={18} fill={rating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Feedback Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-white/15 bg-black px-4 py-3 text-white outline-none focus:border-ember"
                  >
                    <option value="Website Usability & Experience">Website Usability & Experience</option>
                    <option value="Careers & YUVIKA Student Journey">Careers & YUVIKA Student Journey</option>
                    <option value="Bhuvan Geospatial Data & Map Layers">Bhuvan Geospatial Data & Map Layers</option>
                    <option value="OpenAI Citizen Space Agent">OpenAI Citizen Space Agent</option>
                    <option value="IN-SPACe Startup Transfer Gateway">IN-SPACe Startup Transfer Gateway</option>
                    <option value="General Suggestion">General Suggestion</option>
                  </select>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Citizen Name (Optional)</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none focus:border-ember"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none focus:border-ember"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="mb-2 block text-[10px] uppercase tracking-wider text-white/40">Your Comments & Suggestions</label>
                  <textarea
                    required
                    rows={5}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what worked well or what we can improve..."
                    className="w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none focus:border-ember"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 bg-ember py-4 text-[11px] font-bold uppercase tracking-[.2em] text-white transition-colors hover:bg-[#ff7654]"
                >
                  Submit Feedback <Send size={15} />
                </button>
              </form>
            )}
          </div>

          {/* Citizen Charter Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            <div className="border border-white/10 bg-white/[.02] p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ember/30 bg-ember/10 text-ember mb-4">
                <HeartHandshake size={20} />
              </span>
              <h3 className="text-xl font-medium text-white">Citizen Commitment</h3>
              <p className="mt-3 text-xs leading-6 text-white/60">
                ISRO is dedicated to transparent public communication, prompt dissemination of open Earth observation science, and equitable access to student space learning programs.
              </p>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-xs text-white/70">
                <p>✓ All submissions reviewed weekly</p>
                <p>✓ Constructive insights directly briefed to portal architects</p>
                <p>✓ Zero personally identifiable data sold or shared</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
