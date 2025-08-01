"use client";

import { useAppStore } from "@/store";

export const TranscriptDisplay = () => {
  const { transcript, error } = useAppStore();

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <h3 className='text-lg font-semibold mb-3 text-gray-800'>
        Văn bản nhận dạng:
      </h3>

      <div
        className={`
        min-h-[120px] p-4 border-2 rounded-lg bg-gray-50
        ${error ? "border-red-300 bg-red-50" : "border-gray-200"}
      `}
      >
        {error ? (
          <p className='text-red-600 text-sm'>{error}</p>
        ) : transcript ? (
          <p className='text-gray-800 leading-relaxed'>{transcript}</p>
        ) : (
          <p className='text-gray-500 italic'>
            Nhấn nút ghi âm để bắt đầu nhận dạng giọng nói...
          </p>
        )}
      </div>
    </div>
  );
};
