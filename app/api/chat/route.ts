import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatRequest {
  message?: unknown;
}

const ISRO_SYSTEM_PROMPT = `You are the ISRO Citizen Space Agent, a helpful public-facing AI assistant for the Indian Space Research Organisation.

Answer questions concisely, professionally, and in plain language. Never invent official dates, application rules, launch schedules, or statistics. If the supplied facts do not answer a question, clearly say that the user should verify the latest information on the official ISRO website (isro.gov.in).

Use this verified ISRO context when relevant:
1. YUVIKA is ISRO's Young Scientist Programme. It is designed primarily for Class 9 students and introduces them to space science and technology through lectures, practical activities, facility visits, and interaction with scientists. Eligibility and dates can vary by edition.
2. Gaganyaan is India's human spaceflight programme. It aims to demonstrate an indigenous capability to send a crew of three astronauts to a 400 km low Earth orbit for approximately three days and return them safely to Indian waters.
3. Bhuvan is ISRO's national geoportal for Earth observation data and geospatial applications, including mapping and planning use cases.
4. Chandrayaan-3 achieved a soft landing on the lunar surface and deployed the Vikram lander and Pragyan rover near the lunar south polar region in August 2023.
5. Aditya-L1 is India's first space-based solar observatory, positioned around the Sun-Earth L1 point to study the Sun and space weather.
6. ISRO develops launch vehicles, satellites, space science missions, Earth observation applications, navigation services, and communication technologies for national development.

When discussing careers, student programmes, or public services, provide practical next steps and direct users to official ISRO announcements for current application windows. Do not claim to submit applications, access private records, or provide live mission control data.`;

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
      temperature: 0.2,
      maxOutputTokens: 500,
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
