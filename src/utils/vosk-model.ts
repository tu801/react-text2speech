import { VOSK_MODEL_URL } from "./constants";

// Check if VOSK model files exist locally
export const checkModelExists = async (): Promise<boolean> => {
  try {
    // Try to fetch a required model file to check if model exists
    const response = await fetch(`${VOSK_MODEL_URL}/conf/model.conf`);
    return response.ok;
  } catch {
    // Try alternative model file
    try {
      const response = await fetch(`${VOSK_MODEL_URL}/README`);
      return response.ok;
    } catch {
      return false;
    }
  }
};

export function getVoskModeViaAPI() {
  // Try to load VOSK
  const script = document.createElement("script");
  script.src = "https://unpkg.com/vosk-browser@0.0.7/dist/vosk.js";
  script.onload = async () => {
    try {
      if (window.Model) {
        const model = await new window.Model(VOSK_MODEL_URL);
        modelRef.current = model;
        setIsModelLoaded(true);
        console.log("VOSK model loaded successfully");
      }
    } catch (error) {
      console.error("Failed to load VOSK model:", error);
      // Fallback to Web Speech API
      if (SpeechRecognition) {
        setUseWebSpeechAPI(true);
        setIsModelLoaded(true);
      } else {
        setRecordingError(
          "Không có phương thức nhận dạng giọng nói nào khả dụng"
        );
      }
    }
  };
  script.onerror = () => {
    console.error("Failed to load VOSK script");
    if (SpeechRecognition) {
      setUseWebSpeechAPI(true);
      setIsModelLoaded(true);
    } else {
      setRecordingError("Không thể tải thư viện nhận dạng giọng nói");
    }
  };
  document.head.appendChild(script);
}
