"use client";

import { useSpeechRecognition } from "@/features/speech/useSpeechRecognition";

export const ModelStatus = () => {
  const { isModelLoaded, useWebSpeechAPI } = useSpeechRecognition();

  if (!isModelLoaded) {
    return (
      <div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin'></div>
          <span className='text-yellow-700 text-sm font-medium'>
            Đang kiểm tra và khởi tạo speech recognition...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mb-4 p-3 rounded-lg border ${
        useWebSpeechAPI
          ? "bg-blue-50 border-blue-200"
          : "bg-green-50 border-green-200"
      }`}
    >
      <div className='flex items-center gap-2'>
        <div
          className={`w-3 h-3 rounded-full ${
            useWebSpeechAPI ? "bg-blue-500" : "bg-green-500"
          }`}
        ></div>
        <span
          className={`text-sm font-medium ${
            useWebSpeechAPI ? "text-blue-700" : "text-green-700"
          }`}
        >
          {useWebSpeechAPI
            ? "🌐 Sử dụng Web Speech API (Online)"
            : "💻 Sử dụng VOSK Model (Offline)"}
        </span>
      </div>
    </div>
  );
};
