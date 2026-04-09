import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

import { GoogleGenAI } from '@google/genai';
import { GOOGLE_GEN_AI } from './google-gen-ai.provider';

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GOOGLE_GEN_AI) private readonly googleGenAI: GoogleGenAI,
  ) {}

  async transcribeAudio(
    audioAsBase64: string,
    mimeType: string,
  ): Promise<string> {
    const audio = await this.retry(() =>
      this.googleGenAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            text: 'Transcreva o áudio para português. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado. Não responsa, não interprete, não corrija. Retorne apenas o texto bruto.',
          },
          {
            inlineData: {
              mimeType,
              data: audioAsBase64,
            },
          },
        ],
      }),
    );

    if (!audio.text) {
      throw new BadRequestException('The text could not be converted.');
    }

    return audio.text;
  }

  async generateEmbeddingsFromText(text: string) {
    const response = await this.retry(() =>
      this.googleGenAI.models.embedContent({
        model: 'gemini-embedding-2-preview',
        contents: [{ text }],
        config: {
          taskType: 'RETRIEVAL_DOCUMENT',
        },
      }),
    );

    const values = response.embeddings?.[0]?.values;

    if (!values) {
      throw new BadRequestException('Unable to generate embeddings.');
    }

    return values.slice(0, 768);
  }

  async generateEmbeddingsFromAudio(audioAsBase64: string, mimeType: string) {
    const response = await this.retry(() =>
      this.googleGenAI.models.embedContent({
        model: 'gemini-embedding-2-preview',
        contents: [
          {
            parts: [
              {
                inlineData: {
                  data: audioAsBase64,
                  mimeType,
                },
              },
            ],
          },
        ],
        config: {
          taskType: 'RETRIEVAL_DOCUMENT',
        },
      }),
    );

    const values = response.embeddings?.[0]?.values;

    if (!values) {
      throw new BadRequestException('Unable to generate embeddings.');
    }

    return values.slice(0, 768);
  }

  async generateAnswer(question: string, transcription: string[]) {
    const context = transcription.join('\n\n');

    const prompt = `
      Com base no texto fornecido abaixo como contexto, responsa a pergunta de forma clara e precisa em português do Brasil.

      CONTEXT:
      ${context}

      PERGUNTA:
      ${question}

      INSTRUÇÕES:
      - Use apenas informações contidas no contexto enviado;
      - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficientes para responder;
      - Seja objetivo;
      - Mantenha um tom educativo e profissional;
      - Cite trechos relevantes do contexto se apropriado;
      - Se for citar o contexto, utilize o termo "conteúdo da aula";
    `.trim();

    const response = await this.googleGenAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          text: prompt,
        },
      ],
    });

    if (!response.text) {
      throw new BadRequestException(
        'Failed to generate a response from Gemini',
      );
    }

    return response.text;
  }

  private async retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      console.log(error);
      if (this.isHttpError(error) && error.status === 429) {
        throw new ServiceUnavailableException(
          'Embedding service is temporarily unavailable. Please try again later.',
        );
      }

      if (retries === 0) {
        if (this.isHttpError(error) && error.status === 503) {
          throw new ServiceUnavailableException(
            'AI service temporarily unavailable. Please try again.',
          );
        }

        throw error;
      }

      if (this.isHttpError(error) && error?.status === 503) {
        await new Promise((res) => setTimeout(res, 1000));
        return this.retry(fn, retries - 1);
      }

      throw error;
    }
  }

  private isHttpError(error: unknown): error is { status: number } {
    if (typeof error !== 'object' || error === null) {
      return false;
    }

    if (!('status' in error)) {
      return false;
    }

    const err = error as { status?: unknown };

    return typeof err.status === 'number';
  }
}
