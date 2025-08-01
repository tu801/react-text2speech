import { NextRequest, NextResponse } from "next/server";
import { TranslatorFactory } from "@/libs/ai";

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang, model, ollamaBaseUrl } = await request.json();

    if (!text || !targetLang || !model) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const translator = TranslatorFactory.createTranslator(model, ollamaBaseUrl);
    const translatedText = await translator.translate(text, targetLang);

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Translation failed" },
      { status: 500 }
    );
  }
}
