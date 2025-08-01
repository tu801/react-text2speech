import { GeminiTranslator } from '@/libs/ai/gemini';
import { OllamaTranslator } from '@/libs/ai/ollama';
import { OpenAITranslator } from '@/libs/ai/openai';

export interface TranslationRequest {
  text: string;
  targetLang: string;
  model: string;
  ollamaBaseUrl?: string;
}

export interface TranslationResponse {
  translatedText?: string;
  error?: string;
}

export class TranslationService {
  static async translate({
    text,
    targetLang,
    model,
    ollamaBaseUrl,
  }: TranslationRequest): Promise<string> {
    let response;
    switch (model) {
      case 'openai':
        const openAITrans = new OpenAITranslator();
        response = await openAITrans.translate(text, targetLang);
        break;
      case 'gemini':
        const geminiTrans = new GeminiTranslator();
        response = await geminiTrans.translate(text, targetLang);
        break;
      case 'ollama':
        const ollamaTrans = new OllamaTranslator();
        response = await ollamaTrans.translate(text, targetLang);
        break;
    }

    if (!response) {
      // const errorData: TranslationResponse = await response.json();
      throw new Error('Translation failed');
    }

    // const data: TranslationResponse = await response.json();
    return response || 'Translation failed';
  }
}
