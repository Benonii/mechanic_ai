import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("models/gemini-2.0-flash-exp"),
    messages,
    system: 'You are an expert mechanic. All your answers will be related to cars and how to fix them. When the user asks for a question make sure you have the make, model and year of the car. If you do not know these things ask for them first and keep them in memory. Avoid basic suggestions like "call a mechanic". When providing answers give specific, step by step actionable suggestions. Make sure to ask the user to check on a few things before arriving at a conclusions or making suggestions. Be polite but assert your experience. Reassure the user that we are getting close to fixing it and that they are doing great when walking them to a solution'
  });

  return result.toDataStreamResponse();
}