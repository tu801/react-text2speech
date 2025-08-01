# Speech2Text - Vietnamese Speech Recognition & AI Translation

Ứng dụng web demo nhận dạng giọng nói tiếng Việt và dịch văn bản bằng AI với khả năng hoạt động offline.

## ✨ Tính năng chính

- **🎤 Nhận dạng giọng nói tiếng Việt**:

  - Hỗ trợ VOSK (offline) và Web Speech API (online)
  - Tự động fallback khi không có model VOSK
  - Nhận dạng real-time với kết quả tạm thời

- **🤖 Dịch văn bản đa AI**:

  - OpenAI GPT-3.5 Turbo
  - Google Gemini Pro
  - Ollama (Local LLM)
  - Hỗ trợ 12+ ngôn ngữ đích

- **⚡ Hiệu suất cao**:
  - Next.js 15 với App Router
  - TypeScript strict mode
  - Zustand state management
  - Tailwind CSS responsive design

## 🚀 Cài đặt và chạy

### 1. Clone và cài đặt dependencies

\`\`\`bash
git clone <repository-url>
cd speech2text
npm install
\`\`\`

### 2. Cấu hình environment variables

Tạo file \`.env.local\`:
\`\`\`env

# OpenAI Configuration

OPENAI_API_KEY=your-openai-api-key

# Google Gemini Configuration

GEMINI_API_KEY=your-gemini-api-key

# Ollama Configuration (cho local LLM)

OLLAMA_API_URL=http://localhost:11434
\`\`\`

### 3. (Tùy chọn) Tải VOSK model cho offline STT

1. Truy cập: https://alphacephei.com/vosk/models
2. Tải \`vosk-model-small-vi-0.22.zip\`
3. Giải nén vào \`public/models/vosk-model-small-vi-0.22/\`

### 4. Chạy ứng dụng

\`\`\`bash
npm run dev
\`\`\`

Mở [http://localhost:3000](http://localhost:3000) để sử dụng.

## 🏗️ Cấu trúc dự án

\`\`\`
src/
├── app/
│ ├── api/translate/ # API routes cho translation
│ └── page.tsx # Trang chính
├── components/ # UI components
│ ├── RecorderButton.tsx
│ ├── TranscriptDisplay.tsx
│ ├── ModelSelector.tsx
│ └── TranslateResult.tsx
├── features/
│ ├── speech/ # Speech recognition logic
│ └── translation/ # Translation services
├── libs/ai/ # AI service abstractions
│ ├── openai.ts
│ ├── gemini.ts
│ ├── ollama.ts
│ └── index.ts
├── store/ # Zustand store
├── types/ # TypeScript definitions
└── utils/ # Utilities và constants
\`\`\`

## 🎯 Cách sử dụng

1. **Ghi âm**: Nhấn nút microphone để bắt đầu ghi âm
2. **Xem kết quả**: Văn bản được nhận dạng sẽ hiển thị real-time
3. **Chọn AI model**: Chọn OpenAI, Gemini, hoặc Ollama
4. **Chọn ngôn ngữ đích**: Chọn ngôn ngữ muốn dịch
5. **Dịch**: Nhấn nút "Dịch" để có kết quả

## 🔧 Cấu hình AI Models

### OpenAI

- Cần API key từ OpenAI
- Sử dụng model GPT-3.5 Turbo
- Chi phí theo usage

### Google Gemini

- Cần API key từ Google AI Studio
- Sử dụng model Gemini Pro
- Có free tier

### Ollama

- Chạy local LLM
- Cài đặt Ollama: https://ollama.ai
- Chạy model: \`ollama run llama2\`
- Hoàn toàn miễn phí và private

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Speech Recognition**: VOSK + Web Speech API
- **AI Services**: OpenAI SDK, Google Generative AI, Axios
- **Build Tools**: ESLint, PostCSS

## 📝 Ghi chú phát triển

- Ứng dụng có thể hoạt động với Web Speech API khi không có VOSK model
- API routes được sử dụng để bảo mật API keys
- Responsive design cho mobile và desktop
- Error handling toàn diện
- Clean architecture dễ mở rộng

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 License

MIT License
