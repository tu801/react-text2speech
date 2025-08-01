"use client";

import { useAppStore } from "@/store";
import { AI_MODELS } from "@/libs/ai";
import { SUPPORTED_LANGUAGES } from "@/utils/constants";

export const ModelSelector = () => {
  const { selectedModel, targetLanguage, setSelectedModel, setTargetLanguage } =
    useAppStore();

  return (
    <div className='w-full max-w-2xl mx-auto space-y-4'>
      <div className='grid md:grid-cols-2 gap-4'>
        {/* AI Model Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Chọn AI Model:
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            {AI_MODELS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <p className='text-xs text-gray-500 mt-1'>
            {AI_MODELS.find((m) => m.id === selectedModel)?.description}
          </p>
        </div>

        {/* Target Language Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Dịch sang ngôn ngữ:
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
