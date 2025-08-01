<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Speech2Text App - Copilot Instructions

This is a Next.js 15 app with TypeScript that provides:

1. **Vietnamese Speech Recognition**: Uses vosk-browser with offline Vietnamese model (vosk-model-small-vi-0.22)
2. **AI Translation**: Supports OpenAI GPT, Google Gemini, and Ollama local LLM
3. **State Management**: Uses Zustand for application state
4. **Styling**: Tailwind CSS for responsive design

## Key Technologies:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- vosk-browser
- OpenAI SDK
- Google Generative AI SDK

## Project Structure:

- `/src/app/` - Next.js App Router pages
- `/src/components/` - Reusable UI components
- `/src/features/speech/` - Speech recognition related code
- `/src/features/translation/` - Translation related code
- `/src/libs/ai/` - AI service abstractions
- `/src/types/` - TypeScript type definitions
- `/src/utils/` - Utility functions
- `/public/models/` - VOSK model files

## Code Style Guidelines:

- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Implement proper error handling
- Use Tailwind CSS utility classes
- Follow clean architecture principles
- Make components reusable and testable
