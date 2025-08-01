export interface Translator {
  name: string;
  translate: (text: string, targetLang: string) => Promise<string>;
}

export interface SpeechRecognitionState {
  isRecording: boolean;
  transcript: string;
  isLoading: boolean;
  error: string | null;
}

export interface TranslationState {
  selectedModel: string;
  targetLanguage: string;
  translatedText: string;
  isTranslating: boolean;
  error: string | null;
}

export interface AppState extends SpeechRecognitionState, TranslationState {
  // Speech recognition actions
  startRecording: () => void;
  stopRecording: () => void;
  setTranscript: (transcript: string) => void;
  setRecordingError: (error: string | null) => void;

  // Translation actions
  setSelectedModel: (model: string) => void;
  setTargetLanguage: (language: string) => void;
  translateText: (text: string) => Promise<void>;
  setTranslationError: (error: string | null) => void;
  clearTranslation: () => void;
}

export interface SupportedLanguage {
  code: string;
  name: string;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
}
