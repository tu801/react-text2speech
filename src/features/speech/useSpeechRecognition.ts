"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store";
import { VOSK_MODEL_URL } from "@/utils/constants";
import { checkModelExists } from "@/utils/vosk-model";

// Define types for vosk-browser
interface VoskModel {}
interface VoskRecognizer {
  acceptWaveform(data: Float32Array): boolean;
  result(): { text: string };
  partialResult(): { partial: string };
  finalResult(): { text: string };
}

declare global {
  interface Window {
    Model: {
      new (modelUrl: string): Promise<VoskModel>;
    };
    KaldiRecognizer: {
      new (model: VoskModel, sampleRate: number): VoskRecognizer;
    };
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export const useSpeechRecognition = () => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    setTranscript,
    setRecordingError,
  } = useAppStore();

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [useWebSpeechAPI, setUseWebSpeechAPI] = useState(false);

  const recognizerRef = useRef<VoskRecognizer | any>(null);
  const modelRef = useRef<VoskModel | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  // Try to load VOSK model, fallback to Web Speech API
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Check if Web Speech API is available as fallback
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
          const localModelExists = await checkModelExists();
          // if (!localModelExists) {
          console.log("Web Speech API available as fallback");
          setUseWebSpeechAPI(true);
          setIsModelLoaded(true);
          // } else {
          //   const model = await new window.Model(VOSK_MODEL_URL);
          //   modelRef.current = model;
          //   setIsModelLoaded(true);
          //   console.log("VOSK model exists locally");
          // }
          return;
        }
      } catch (error) {
        console.error("Speech recognition setup error:", error);
        setRecordingError("Lỗi khởi tạo nhận dạng giọng nói");
      }
    };

    loadModel();
  }, [setRecordingError]);

  const startWebSpeechRecording = () => {
    console.log("Web Speech API recording!");
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "vi-VN";

    recognition.onstart = () => {
      startRecording();
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setRecordingError(`Lỗi nhận dạng: ${event.error}`);
    };

    recognition.onend = () => {
      stopRecording();
    };

    recognizerRef.current = recognition;
    recognition.start();
  };

  const startVoskRecording = async () => {
    if (!modelRef.current) {
      setRecordingError("Model chưa được tải");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      streamRef.current = stream;
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);

      recognizerRef.current = new window.KaldiRecognizer(
        modelRef.current,
        16000
      );

      processorRef.current = audioContextRef.current.createScriptProcessor(
        4096,
        1,
        1
      );
      processorRef.current.onaudioprocess = (event) => {
        if (recognizerRef.current) {
          const inputData = event.inputBuffer.getChannelData(0);
          const isEndOfSpeech = recognizerRef.current.acceptWaveform(inputData);

          if (isEndOfSpeech) {
            const result = recognizerRef.current.result();
            if (result.text) {
              setTranscript(result.text);
            }
          } else {
            const partialResult = recognizerRef.current.partialResult();
            if (partialResult.partial) {
              setTranscript(partialResult.partial);
            }
          }
        }
      };

      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);

      startRecording();
    } catch (error) {
      console.error("Failed to start VOSK recording:", error);
      setRecordingError("Không thể truy cập microphone");
    }
  };

  const startRecordingHandler = async () => {
    if (!isModelLoaded) {
      setRecordingError("Hệ thống chưa sẵn sàng");
      return;
    }

    try {
      if (useWebSpeechAPI) {
        startWebSpeechRecording();
      } else {
        await startVoskRecording();
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
      setRecordingError("Không thể bắt đầu ghi âm");
    }
  };

  const stopRecordingHandler = () => {
    try {
      if (useWebSpeechAPI && recognizerRef.current) {
        recognizerRef.current.stop();
      } else if (recognizerRef.current) {
        const finalResult = recognizerRef.current.finalResult();
        if (finalResult.text) {
          setTranscript(finalResult.text);
        }
      }

      // Clean up VOSK resources
      if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      stopRecording();
    } catch (error) {
      console.error("Error stopping recording:", error);
      stopRecording();
    }
  };

  return {
    isModelLoaded,
    isRecording,
    useWebSpeechAPI,
    startRecording: startRecordingHandler,
    stopRecording: stopRecordingHandler,
  };
};
