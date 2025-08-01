import { create } from "zustand";
import { AppState } from "@/types";
import { TranslationService } from "@/features/translation/translationService";
import { formatError } from "@/utils/constants";

export const useAppStore = create<AppState>((set, get) => ({
  // Speech recognition state
  isRecording: false,
  transcript: "",
  isLoading: false,
  error: null,

  // Translation state
  selectedModel: "openai",
  targetLanguage: "English",
  translatedText: "",
  isTranslating: false,

  // Speech recognition actions
  startRecording: () => {
    set({ isRecording: true, error: null });
  },

  stopRecording: () => {
    set({ isRecording: false });
  },

  setTranscript: (transcript: string) => {
    set({ transcript, error: null });
  },

  setRecordingError: (error: string | null) => {
    set({ error, isRecording: false, isLoading: false });
  },

  // Translation actions
  setSelectedModel: (selectedModel: string) => {
    set({ selectedModel });
  },

  setTargetLanguage: (targetLanguage: string) => {
    set({ targetLanguage });
  },

  translateText: async (text: string) => {
    const { selectedModel, targetLanguage } = get();

    if (!text.trim()) {
      set({ error: "Không có văn bản để dịch" });
      return;
    }

    set({ isTranslating: true, error: null });

    try {
      const translatedText = await TranslationService.translate({
        text,
        targetLang: targetLanguage,
        model: selectedModel,
      });
      set({ translatedText, isTranslating: false });
    } catch (error) {
      set({
        error: formatError(error),
        isTranslating: false,
        translatedText: "",
      });
    }
  },

  setTranslationError: (error: string | null) => {
    set({ error, isTranslating: false });
  },

  clearTranslation: () => {
    set({ translatedText: "", error: null });
  },
}));
