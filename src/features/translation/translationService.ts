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
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        targetLang,
        model,
        ollamaBaseUrl,
      }),
    });

    if (!response.ok) {
      const errorData: TranslationResponse = await response.json();
      throw new Error(errorData.error || "Translation failed");
    }

    const data: TranslationResponse = await response.json();
    return data.translatedText || "Translation failed";
  }
}
