"use client";

import { useState } from "react";

export const ModelGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mb-4'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-blue-600 hover:text-blue-800 text-sm underline flex items-center gap-1'
      >
        📥 Hướng dẫn cài đặt VOSK model (offline)
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className='mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm'>
          <h4 className='font-semibold text-blue-800 mb-2'>
            Để sử dụng nhận dạng giọng nói offline:
          </h4>
          <ol className='list-decimal list-inside space-y-1 text-blue-700'>
            <li>
              Truy cập:{" "}
              <a
                href='https://alphacephei.com/vosk/models'
                target='_blank'
                rel='noopener noreferrer'
                className='underline'
              >
                https://alphacephei.com/vosk/models
              </a>
            </li>
            <li>
              Tải về file{" "}
              <code className='bg-blue-100 px-1 rounded'>
                vosk-model-small-vi-0.22.zip
              </code>
            </li>
            <li>
              Giải nén và copy tất cả file vào thư mục{" "}
              <code className='bg-blue-100 px-1 rounded'>
                public/models/vosk-model-small-vi-0.22/
              </code>
            </li>
            <li>Reload trang để sử dụng chế độ offline</li>
          </ol>
          <div className='mt-2 p-2 bg-blue-100 rounded text-blue-800'>
            💡 <strong>Lưu ý:</strong> Nếu không có model offline, ứng dụng sẽ
            tự động sử dụng Web Speech API (cần internet).
          </div>
        </div>
      )}
    </div>
  );
};
