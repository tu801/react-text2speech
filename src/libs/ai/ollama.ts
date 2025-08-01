import axios from 'axios';
import { Translator } from '@/types';

export class OllamaTranslator implements Translator {
  name = 'Ollama Local';
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl || process.env.OLLAMA_API_URL || 'http://localhost:11434';
  }

  async translate(text: string, targetLang: string): Promise<string> {
    const prompt = `Translate the following Vietnamese text to ${targetLang}. Only return the translation, no explanations:\n\n${text}`;
    const llmaModelUrl = `${this.baseUrl}/api/chat`;
    const llmaRequest = {
      model: 'llama3.1:8b', //insert any models from Ollama that are on your local machine
      messages: [
        {
          role: 'system', //"system" is a prompt to define how the model should act.
          content: 'you are a translator agent that help user translate text', //system prompt should be written here
        },
        {
          role: 'user', //"user" is a prompt provided by the user.
          content: prompt,
        },
      ],
      stream: false, //returns as a full message rather than a streamed response
    };
    console.log('model URL: ', llmaModelUrl);
    console.log('Post Params: ', llmaRequest);

    try {
      const response = await axios.post(llmaModelUrl, llmaRequest, {
        timeout: 30000, // 30 second timeout
      });
      console.log('response: ', response);
      return response.data.message.content.trim() || 'Translation failed';
    } catch (error) {
      console.error('Ollama translation error:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error(
            "Cannot connect to Ollama server. Make sure it's running on " +
              this.baseUrl
          );
        }
        throw new Error(`Ollama server error: ${error.message}`);
      }
      throw new Error('Failed to translate with Ollama');
    }
  }
}
