import { Injectable } from '@nestjs/common';

import { GeminiService } from '../gemini/gemini.service';

import { AudioRepository } from './audio.repository';

import type { AudioChunkWithoutEmbedding } from './types/audio-chunk-without-embedding';

@Injectable()
export class AudioService {
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly geminiService: GeminiService,
  ) {}

  async findTopBySemanticSimilarity(roomId: string, embedding: number[]) {
    return this.audioRepository.getTopBySemanticSimilarity(roomId, embedding);
  }

  async create(
    roomId: string,
    audio: Express.Multer.File,
  ): Promise<AudioChunkWithoutEmbedding> {
    const transcription = await this.transcribe(audio);

    const embeddings = await this.generateEmbeddings(transcription);

    return this.audioRepository.create({
      roomId,
      transcription,
      embeddings,
    });
  }

  async transcribe(audio: Express.Multer.File): Promise<string> {
    const audioAsBase64 = audio.buffer.toString('base64');

    return this.geminiService.transcribeAudio(audioAsBase64, audio.mimetype);
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    return this.geminiService.generateEmbeddingsFromText(text);
  }
}
