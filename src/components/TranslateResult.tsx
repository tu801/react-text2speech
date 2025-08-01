"use client";

import { useAppStore } from "@/store";

export const TranslateResult = () => {
  const {
    transcript,
    translatedText,
    isTranslating,
    translateText,
    clearTranslation,
    error,
  } = useAppStore();

  const handleTranslate = () => {
    if (transcript.trim()) {
      translateText(transcript);
    }
  };

  const handleClear = () => {
    clearTranslation();
  };

  return (
    <div className='w-full max-w-2xl mx-auto space-y-4'>
      {/* Translate Button */}
      <div className='flex justify-center space-x-4'>
        <button
          onClick={handleTranslate}
          disabled={!transcript.trim() || isTranslating}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${
              !transcript.trim() || isTranslating
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600 hover:scale-105"
            }
          `}
        >
          {isTranslating ? (
            <div className='flex items-center space-x-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Đang dịch...</span>
            </div>
          ) : (
            "Dịch"
          )}
        </button>

        {translatedText && (
          <button
            onClick={handleClear}
            className='px-6 py-3 rounded-lg font-medium bg-gray-500 text-white hover:bg-gray-600 transition-all duration-200'
          >
            Xóa
          </button>
        )}
      </div>

      {/* Translation Result */}
      {(translatedText || error) && (
        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-800'>
            Kết quả dịch:
          </h3>

          <div
            className={`
            min-h-[120px] p-4 border-2 rounded-lg
            ${
              error
                ? "border-red-300 bg-red-50"
                : "border-green-200 bg-green-50"
            }
          `}
          >
            {error ? (
              <p className='text-red-600 text-sm'>{error}</p>
            ) : translatedText ? (
              <p className='text-gray-800 leading-relaxed'>{translatedText}</p>
            ) : (
              <p className='text-gray-500 italic'>Chưa có kết quả dịch...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
