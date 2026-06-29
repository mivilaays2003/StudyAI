import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─── Prompt builders ───────────────────────────────────────────────

function slidesPrompt(text: string) {
  return `You are an expert educator. Based on the following academic document, create a structured presentation with 6-8 slides.

Return ONLY a valid JSON array — no markdown, no preamble — in this exact format:
[{"title": "Slide Title", "bullets": ["point 1", "point 2", "point 3"]}, ...]

Rules:
- First slide: overview/introduction
- Last slide: summary/key takeaways
- Keep bullets concise (1-2 sentences each)
- 3-5 bullets per slide

DOCUMENT:
${text.slice(0, 7000)}`;
}

function quizPrompt(text: string) {
  return `You are an expert educator. Based on the following academic document, create 6 multiple-choice quiz questions.

Return ONLY a valid JSON array — no markdown, no preamble — in this exact format:
[{
  "question": "...",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "answer": "A. ...",
  "explanation": "Brief 1-sentence explanation"
}, ...]

Rules:
- Mix easy, medium, and hard questions
- The "answer" must exactly match one of the "options"
- Base all questions on the document content only

DOCUMENT:
${text.slice(0, 7000)}`;
}

function notesPrompt(text: string) {
  return `You are an expert study coach. Based on the following academic document, create structured study notes with 5-7 clear sections.

Return ONLY a valid JSON array — no markdown, no preamble — in this exact format:
[{
  "heading": "Section Title",
  "content": "Clear, concise 2-4 sentence explanation of this concept.",
  "keyTerms": ["term1", "term2"]
}, ...]

Rules:
- Cover main concepts, methodology, findings, and implications
- Write in plain English a student would understand
- Include key terms for each section

DOCUMENT:
${text.slice(0, 7000)}`;
}

// ─── Safe JSON parser ──────────────────────────────────────────────

function safeParseJSON(raw: string) {
  // Strip markdown code fences if present
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned);
}

// ─── Route handler ─────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const modesRaw = formData.get("modes") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not set in environment" }, { status: 500 });
    }

    // Read file content
    const text = await file.text();
    if (!text || text.trim().length < 50) {
      return NextResponse.json({ error: "File appears empty or too short" }, { status: 400 });
    }

    const modes: string[] = JSON.parse(modesRaw || '["slides"]');
    const results: Record<string, unknown> = {};

    // Call Claude for each requested mode
    for (const mode of modes) {
      let prompt = "";
      if (mode === "slides") prompt = slidesPrompt(text);
      else if (mode === "quiz") prompt = quizPrompt(text);
      else if (mode === "notes") prompt = notesPrompt(text);
      else continue;

      const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      });

      const raw = response.content
        .filter((c) => c.type === "text")
        .map((c) => (c as { type: "text"; text: string }).text)
        .join("");

      results[mode] = safeParseJSON(raw);
    }

    return NextResponse.json({ success: true, results });
  } catch (err: unknown) {
    console.error("Generate API error:", err);
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
