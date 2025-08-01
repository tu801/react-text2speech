import { Translator, AIModel } from "@/types";
import { OpenAITranslator } from "./openai";
import { GeminiTranslator } from "./gemini";
import { OllamaTranslator } from "./ollama";

export const AI_MODELS: AIModel[] = [
  {
    id: "openai",
    name: "OpenAI GPT",
    description: "GPT-3.5 Turbo for accurate translations",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's advanced AI model",
  },
  {
    id: "ollama",
    name: "Ollama Local",
    description: "Local LLM via Ollama",
  },
];

export class TranslatorFactory {
  static createTranslator(modelId: string, ollamaBaseUrl?: string): Translator {
    switch (modelId) {
      case "openai":
        return new OpenAITranslator();
      case "gemini":
        return new GeminiTranslator();
      case "ollama":
        return new OllamaTranslator(ollamaBaseUrl);
      default:
        throw new Error(`Unknown model: ${modelId}`);
    }
  }
}
