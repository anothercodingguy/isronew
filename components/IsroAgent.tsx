"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, MessageCircle, Mic, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message { id: string; role: "user" | "assistant"; content: string; }

const initialMessage: Message = { id: "welcome", role: "assistant", content: "Namaste. I’m the Citizen Space Agent. Ask me about ISRO missions, student programmes, careers, or space technology." };

const PROMPT_CHIPS = [
  { label: "🚀 YUVIKA 2026 Eligibility", query: "Am I eligible for YUVIKA 2026 as a Class 9 student?" },
  { label: "🛰️ Track My Application", query: "How do I track my application status?" },
  { label: "🧑‍🚀 Gaganyaan Escape System", query: "Explain Gaganyaan’s crew escape system." },
  { label: "🌾 Bhuvan Satellite Flood Data", query: "How can farmers access Bhuvan satellite flood data?" }
];

export function IsroAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [loading, setLoading] = useState(false);
  const [voiceHint, setVoiceHint] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function handleSend(textToSend: string) {
    const question = textToSend.trim();
    if (!question || loading) return;
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "user", content: question }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: question }) });
      if (!response.ok || !response.body) throw new Error("The agent is unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = crypto.randomUUID();
      setMessages((current) => [...current, { id: assistantId, role: "assistant", content: "" }]);
      let answer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: answer } : message));
      }
    } catch {
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: "I’m having trouble reaching the space network right now. Please try again in a moment." }]);
    } finally { setLoading(false); }
  }

  async function submitMessage(event?: FormEvent) {
    event?.preventDefault();
    await handleSend(input);
  }

  return <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"><AnimatePresence>{open && <motion.section initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .96 }} transition={{ duration: .22 }} className="flex h-[min(650px,calc(100vh-110px))] w-[min(410px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[.03] shadow-2xl shadow-black/60 backdrop-blur-xl" aria-label="Citizen Space Agent"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full border border-ember/50 bg-ember/10 text-ember"><Sparkles size={17} /></span><div><p className="text-xs font-semibold text-white">Citizen Space Agent</p><p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/40"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />ISRO knowledge desk</p></div></div><button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="text-white/45 transition-colors hover:text-white"><X size={18} /></button></div><div className="flex-1 space-y-4 overflow-y-auto p-4"><div className="rounded-lg border border-ember/20 bg-ember/[.06] px-3 py-2 text-[10px] leading-4 text-white/45">Prototype mode · responses powered by OpenAI with verified ISRO grounding.</div>{messages.map((message) => <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-sm bg-ember text-white" : "rounded-bl-sm bg-white/[.07] text-white/75"}`}>{message.content || <LoaderCircle size={16} className="animate-spin text-ember" />}</div></div>)}{loading && messages[messages.length - 1]?.role === "user" && <div className="flex justify-start"><div className="rounded-2xl rounded-bl-sm bg-white/[.07] px-4 py-3"><span className="flex gap-1"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/45 [animation-delay:-.3s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/45 [animation-delay:-.15s]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/45" /></span></div></div>}{messages.length === 1 && !loading && <div className="mt-2 border-t border-white/10 pt-3"><p className="mb-2.5 text-[10px] uppercase tracking-[.2em] text-white/35">Suggested prompts</p><div className="flex flex-col gap-1.5">{PROMPT_CHIPS.map((chip) => <button key={chip.query} type="button" onClick={() => handleSend(chip.query)} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-left text-xs text-white/75 transition-colors hover:border-ember/40 hover:bg-white/[.08] hover:text-white"><span>{chip.label}</span><span className="text-[10px] text-ember">Ask →</span></button>)}</div></div>}<div ref={endRef} /></div><div className="border-t border-white/10 p-3"><form onSubmit={submitMessage} className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 p-1.5 focus-within:border-ember/60"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask the space agent..." className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" aria-label="Message the Citizen Space Agent" /><button type="button" onClick={() => setVoiceHint((current) => !current)} aria-label="Voice input" className={`rounded-lg p-2 transition-colors ${voiceHint ? "bg-ember/15 text-ember" : "text-white/40 hover:text-white"}`}><Mic size={17} /></button><button type="submit" disabled={!input.trim() || loading} aria-label="Send message" className="rounded-lg bg-ember p-2 text-white transition-colors hover:bg-[#ff7654] disabled:cursor-not-allowed disabled:opacity-40"><Send size={16} /></button></form>{voiceHint && <p className="px-2 pt-2 text-[10px] text-white/35">Voice input is ready for browser speech recognition integration.</p>}</div></motion.section>}</AnimatePresence><motion.button type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: .96 }} onClick={() => setOpen((current) => !current)} aria-label={open ? "Close Citizen Space Agent" : "Open Citizen Space Agent"} className="flex h-14 w-14 items-center justify-center rounded-full border border-ember/60 bg-black text-ember shadow-lg shadow-black/40 transition-colors hover:bg-ember hover:text-white">{open ? <X size={21} /> : <MessageCircle size={22} />}</motion.button></div>;
}
