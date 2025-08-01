import axios from "axios";
import { Translator } from "@/types";

export class OllamaTranslator implements Translator {
  name = "Ollama Local";
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl || process.env.OLLAMA_API_URL || "http://localhost:11434";
  }

  async translate(text: string, targetLang: string): Promise<string> {
    const prompt = `Translate the following Vietnamese text to ${targetLang}. Only return the translation, no explanations:\n\n${text}`;

    try {
      const response = await axios.post(
        `${this.baseUrl}/api/generate`,
        {
          model: "llama2", // Default model, can be configured
          prompt: prompt,
          stream: false,
        },
        {
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data.response?.trim() || "Translation failed";
    } catch (error) {
      console.error("Ollama translation error:", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED") {
          throw new Error(
            "Cannot connect to Ollama server. Make sure it's running on " +
              this.baseUrl
          );
        }
        throw new Error(`Ollama server error: ${error.message}`);
      }
      throw new Error("Failed to translate with Ollama");
    }
  }
}
