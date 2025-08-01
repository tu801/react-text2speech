import { SupportedLanguage } from "@/types";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "English", name: "Tiếng Anh" },
  { code: "Japanese", name: "Tiếng Nhật" },
  { code: "Chinese (Simplified)", name: "Tiếng Trung (Giản thể)" },
  { code: "Chinese (Traditional)", name: "Tiếng Trung (Phồn thể)" },
  { code: "Korean", name: "Tiếng Hàn" },
  { code: "French", name: "Tiếng Pháp" },
  { code: "German", name: "Tiếng Đức" },
  { code: "Spanish", name: "Tiếng Tây Ban Nha" },
  { code: "Italian", name: "Tiếng Ý" },
  { code: "Portuguese", name: "Tiếng Bồ Đào Nha" },
  { code: "Russian", name: "Tiếng Nga" },
  { code: "Thai", name: "Tiếng Thái" },
];

export const VOSK_MODEL_URL = "/models/vosk-model-small-vn-0.4";

export const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};
