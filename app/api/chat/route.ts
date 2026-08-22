import { NextRequest } from "next/server";

export const runtime = "nodejs";
interface ChatRequest { message?: string; }

function getMockAnswer(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("yuvika") || normalized.includes("young scientist")) return "YUVIKA is ISRO’s Young Scientist Programme for students, designed to build awareness of space science and technology through learning sessions, hands-on activities, and visits to ISRO centres. For the latest eligibility rules and application dates, check the official ISRO announcements because each edition can have its own criteria.";
  if (normalized.includes("gaganyaan")) return "Gaganyaan is India’s human spaceflight programme. Its objective is to demonstrate an indigenous capability to send astronauts to low Earth orbit and return them safely to Indian waters. The programme includes uncrewed test missions, crew escape testing, and a human-rated launch vehicle.";
  if (normalized.includes("chandrayaan")) return "Chandrayaan-3 demonstrated a soft landing on the Moon and surface operations near the lunar south polar region. Its lander and rover helped expand India’s understanding of lunar terrain and make future exploration more capable.";
  return "I can help you explore ISRO missions, Gaganyaan, Chandrayaan, Aditya-L1, YUVIKA, careers, and space technology programmes. Ask a specific question and I’ll point you toward a clear, citizen-friendly answer.";
}

export async function POST(request: NextRequest) {
  let body: ChatRequest;
  try { body = await request.json() as ChatRequest; } catch { return Response.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const message = body.message?.trim();
  if (!message) return Response.json({ error: "A message is required" }, { status: 400 });

  // TODO: Replace this mock lookup with the production RAG pipeline:
  // 1. Embed `message` with the selected embedding model.
  // 2. Query the Qdrant collection containing chunked ISRO PDFs, programme pages,
  //    and verified public notices. Apply metadata filters for language and source.
  // 3. Pass the top-k retrieved chunks into the response model as grounded context.
  // const context = await qdrantClient.search({ collectionName: "isro-pdfs", queryVector, limit: 6 });
  const chunks = getMockAnswer(message).match(/.{1,34}(?:\s|$)/g) ?? [getMockAnswer(message)];
  const stream = new ReadableStream<Uint8Array>({ async start(controller) { const encoder = new TextEncoder(); for (const chunk of chunks) { controller.enqueue(encoder.encode(chunk)); await new Promise((resolve) => setTimeout(resolve, 24)); } controller.close(); } });
  return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Content-Type-Options": "nosniff" } });
}
