import OpenAI from "openai";
import { Translator } from "@/types";

export class OpenAITranslator implements Translator {
  name = "OpenAI GPT";
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async translate(text: string, targetLang: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }

    const prompt = `Translate the following Vietnamese text to ${targetLang}. Only return the translation, no explanations:\n\n${text}`;

    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      });

      return (
        completion.choices[0]?.message?.content?.trim() || "Translation failed"
      );
    } catch (error) {
      console.error("OpenAI translation error:", error);
      throw new Error("Failed to translate with OpenAI");
    }
  }
}
