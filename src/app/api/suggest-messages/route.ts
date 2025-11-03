import OpenAI from "openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended, friendly questions in a single string, separated by '||'. They’re for an anonymous social app like Qooh.me, so keep them universal, positive, and curiosity-driven—no personal or sensitive topics. Example format: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'.";

    const result = await streamText({
      model: "gpt-4.1-mini", 
      messages: [
        {
          role: "system",
          content: "You are a creative assistant that writes friendly questions.",
        },
        { role: "user", content: prompt },
      ],
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { success: false, message: "Error generating questions" },
      { status: 500 }
    );
  }
}
