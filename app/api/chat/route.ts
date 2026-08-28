import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatRequest {
  message?: unknown;
}

const ISRO_SYSTEM_PROMPT = `You are the ISRO Citizen Space Agent, a helpful assistant for the Indian Space Research Organisation.

CRITICAL FORMATTING RULES:
- Keep answers SHORT, crisp, and direct (2 to 3 sentences maximum, strictly under 50 words).
- DO NOT use any asterisks, markdown bold stars, bullet lists, or headers (NO * or ** or # or -).
- Write in clean, natural plain text only.
- Never invent official dates, launch schedules, or private statistics.

Key verified ISRO context:
1. YUVIKA is ISRO's Young Scientist Programme for Class 9 students, introducing them to space science, STEM, and facility visits.
2. Gaganyaan is India's human spaceflight mission aiming to send 3 astronauts to a 400 km orbit for 3 days and return them safely to Indian waters.
3. Bhuvan is ISRO's geoportal providing public satellite imagery, flood maps, and agricultural data.
4. Chandrayaan-3 achieved a soft landing on the lunar south polar region in August 2023.
5. Aditya-L1 is India's solar observatory positioned at the Sun-Earth L1 point studying space weather.
6. Careers and internships are managed through the ICRB portal and student fellowship programmes.`;

function getFallbackResponse(query: string): string {
  const lower = query.toLowerCase();
  if (lower.includes("yuvika") || lower.includes("student") || lower.includes("class 9") || lower.includes("young scientist")) {
    return "YUVIKA (Young Scientist Programme) is ISRO's flagship outreach initiative designed for Class 9 students across India. It imparts basic knowledge on space technology, space science, and space applications to ignite interest in STEM. Selection is based on Class 8 marks, science fair participation, and extracurricular achievements. You can apply directly through our Careers & Student portal!";
  }
  if (lower.includes("track") || lower.includes("application") || lower.includes("status") || lower.includes("id")) {
    return "To track your application, navigate to the 'Opportunities' section on the Careers page and click 'Track Status'. Enter your Application ID (for example, ISRO-2026-4821) to view real-time progress across all 4 stages: Submission, Document Verification, Written Test Shortlist, and Final Call.";
  }
  if (lower.includes("gaganyaan") || lower.includes("astronaut") || lower.includes("escape") || lower.includes("crew")) {
    return "Gaganyaan is India's human spaceflight programme. It aims to demonstrate indigenous capability to launch a 3-member crew to a 400 km Low Earth Orbit for a 3-day mission and return them safely to Indian sea waters. The spacecraft features an advanced Crew Escape System (CES) and Environmental Control and Life Support System (ECLSS).";
  }
  if (lower.includes("bhuvan") || lower.includes("flood") || lower.includes("satellite") || lower.includes("geo") || lower.includes("farmer")) {
    return "Bhuvan is ISRO's national geoportal offering high-resolution satellite imagery and thematic datasets. For disaster management, Bhuvan NDEM provides real-time flood inundation maps (using radar from RISAT/Cartosat), while VEDAS and Bhoonidhi provide agricultural drought and crop health monitoring data.";
  }
  if (lower.includes("career") || lower.includes("job") || lower.includes("internship") || lower.includes("fellowship") || lower.includes("recruitment")) {
    return "ISRO recruits engineering and scientific talent through the ISRO Centralised Recruitment Board (ICRB), alongside undergraduate summer internships, JRF fellowships, and startup partnerships via IN-SPACe. Explore our Careers tab to review open positions.";
  }
  return "Namaste! As the Citizen Space Agent, I can assist you with ISRO missions (like Gaganyaan, Chandrayaan, and Aditya-L1), student programmes such as YUVIKA, career opportunities, and public geospatial data on Bhuvan. How can I help your mission today?";
}

function createGuaranteedResponse(text: string): Response {
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: Request) {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return Response.json({ error: "A non-empty message is required." }, { status: 400 });
  }

  if (message.length > 4000) {
    return Response.json({ error: "Message is too long. Please keep it under 4,000 characters." }, { status: 413 });
  }

  const rawOpenAi = process.env.OPENAI_API_KEY?.trim() || "";
  const rawGroq = process.env.GROQ_API_KEY?.trim() || "";
  
  // Ignore dummy/placeholder keys
  const hasOpenAi = Boolean(rawOpenAi && !rawOpenAi.includes("your_") && rawOpenAi.length > 10);
  const hasGroq = Boolean(rawGroq && !rawGroq.includes("your_") && rawGroq.length > 10);

  // If no live API key is set, respond instantly with verified ISRO knowledge
  if (!hasOpenAi && !hasGroq) {
    const fallbackText = getFallbackResponse(message);
    return createGuaranteedResponse(fallbackText);
  }

  try {
    const selectedModel = hasOpenAi
      ? openai(process.env.OPENAI_MODEL || "gpt-4o-mini")
      : groq(process.env.GROQ_MODEL || "openai/gpt-oss-20b");

    const result = streamText({
      model: selectedModel,
      system: ISRO_SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
      temperature: 0.1,
      maxOutputTokens: 120,
    });

    return result.toTextStreamResponse({
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("ISRO live model request failed, using knowledge fallback:", error);
    const fallbackText = getFallbackResponse(message);
    return createGuaranteedResponse(fallbackText);
  }
}
