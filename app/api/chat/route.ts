import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatRequest {
  message?: unknown;
}

const ISRO_SYSTEM_PROMPT = `You are the ISRO Citizen Space Agent, a helpful public-facing assistant for the Indian Space Research Organisation.

Answer questions concisely, professionally, and in plain language. Never invent official dates, application rules, launch schedules, or statistics. If the supplied facts do not answer a question, clearly say that the user should verify the latest information on the official ISRO website (isro.gov.in).

Use this verified ISRO context when relevant:
1. YUVIKA is ISRO's Young Scientist Programme. It is designed primarily for Class 9 students and introduces them to space science and technology through lectures, practical activities, facility visits, and interaction with scientists. Eligibility and dates can vary by edition.
2. Gaganyaan is India's human spaceflight programme. It aims to demonstrate an indigenous capability to send a crew of three astronauts to a 400 km low Earth orbit for approximately three days and return them safely to Indian waters.
3. Bhuvan is ISRO's national geoportal for Earth observation data and geospatial applications, including mapping and planning use cases.
4. Chandrayaan-3 achieved a soft landing on the lunar surface and deployed the Vikram lander and Pragyan rover near the lunar south polar region in August 2023.
5. Aditya-L1 is India's first space-based solar observatory, positioned around the Sun-Earth L1 point to study the Sun and space weather.
6. ISRO develops launch vehicles, satellites, space science missions, Earth observation applications, navigation services, and communication technologies for national development.

When discussing careers, student programmes, or public services, provide practical next steps and direct users to official ISRO announcements for current application windows. Do not claim to submit applications, access private records, or provide live mission control data.`;

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "The AI service is not configured. Add GROQ_API_KEY to the environment." },
      { status: 503 },
    );
  }

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

  try {
    // This demo intentionally uses context injection instead of a vector database.
    // A future retrieval layer can append verified ISRO documents to this system prompt
    // before calling streamText, without changing the frontend streaming contract.
    const result = streamText({
      model: groq("llama3-8b-8192"),
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
    console.error("ISRO chat request failed:", error);
    return Response.json({ error: "The Citizen Space Agent is temporarily unavailable." }, { status: 500 });
  }
}
