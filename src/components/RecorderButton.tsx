"use client";

import { useSpeechRecognition } from "@/features/speech/useSpeechRecognition";

export const RecorderButton = () => {
  const {
    isModelLoaded,
    isRecording,
    useWebSpeechAPI,
    startRecording,
    stopRecording,
  } = useSpeechRecognition();

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className='flex flex-col items-center space-y-4'>
      <button
        onClick={handleClick}
        disabled={!isModelLoaded}
        className={`
          relative w-20 h-20 rounded-full border-4 transition-all duration-200 
          ${
            isRecording
              ? "bg-red-500 border-red-600 animate-pulse"
              : "bg-blue-500 border-blue-600 hover:bg-blue-600"
          }
          ${
            !isModelLoaded
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:scale-105"
          }
        `}
      >
        <div className='absolute inset-0 flex items-center justify-center'>
          {isRecording ? (
            <div className='w-6 h-6 bg-white rounded-sm'></div>
          ) : (
            <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
              <div className='w-4 h-4 bg-blue-500 rounded-full'></div>
            </div>
          )}
        </div>
      </button>

      <div className='text-center'>
        {!isModelLoaded && (
          <p className='text-gray-500 text-sm'>Đang kiểm tra và tải model...</p>
        )}
        {isModelLoaded && (
          <>
            <p className='text-gray-700 text-sm font-medium'>
              {isRecording ? "Đang ghi âm..." : "Nhấn để ghi âm"}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              {useWebSpeechAPI
                ? "🌐 Web Speech API (Online)"
                : "💻 VOSK (Offline)"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
