import { GoogleGenerativeAI } from "@google/generative-ai";
import { Translator } from "@/types";

export class GeminiTranslator implements Translator {
  name = "Google Gemini";
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  }

  async translate(text: string, targetLang: string): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API key not configured");
    }

    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Translate the following Vietnamese text to ${targetLang}. Only return the translation, no explanations:\n\n${text}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim() || "Translation failed";
    } catch (error) {
      console.error("Gemini translation error:", error);
      throw new Error("Failed to translate with Gemini");
    }
  }
}
