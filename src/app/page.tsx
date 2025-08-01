"use client";

import { RecorderButton } from "@/components/RecorderButton";
import { TranscriptDisplay } from "@/components/TranscriptDisplay";
import { ModelSelector } from "@/components/ModelSelector";
import { TranslateResult } from "@/components/TranslateResult";
import { ModelGuide } from "@/components/ModelGuide";

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='container mx-auto max-w-4xl'>
        {/* Header */}
        <header className='text-center py-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Speech2Text</h1>
          <p className='text-gray-600 text-lg'>
            Nhận dạng giọng nói tiếng Việt & Dịch AI
          </p>
        </header>

        {/* Main Content */}
        <main className='space-y-8'>
          {/* Recorder Section */}
          <section className='bg-white rounded-xl shadow-lg p-8'>
            <ModelGuide />
            <div className='text-center'>
              <RecorderButton />
            </div>
          </section>

          {/* Transcript Display */}
          <section className='bg-white rounded-xl shadow-lg p-8'>
            <TranscriptDisplay />
          </section>

          {/* Translation Controls */}
          <section className='bg-white rounded-xl shadow-lg p-8'>
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
                Dịch văn bản
              </h2>
              <p className='text-gray-600'>Chọn AI model và ngôn ngữ để dịch</p>
            </div>
            <ModelSelector />
          </section>

          {/* Translation Result */}
          <section className='bg-white rounded-xl shadow-lg p-8'>
            <TranslateResult />
          </section>
        </main>

        {/* Footer */}
        <footer className='text-center py-8 text-gray-500'>
          <p>Powered by VOSK (Offline STT) + OpenAI/Gemini/Ollama</p>
        </footer>
      </div>
    </div>
  );
}
