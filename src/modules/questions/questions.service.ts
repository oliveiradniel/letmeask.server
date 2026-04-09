import { Injectable } from '@nestjs/common';

import { GeminiService } from '../gemini/gemini.service';
import { AudioService } from '../audio/audio.service';
import { RoomsService } from '../rooms/rooms.service';

import { QuestionsRepository } from './questions.repository';

import type { Question } from 'src/entities/Question';
import type { CreateAnswerData } from './types/create-answer-data.type';

@Injectable()
export class QuestionsService {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly roomsService: RoomsService,
    private readonly audioService: AudioService,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async create(roomId: string, question: string): Promise<Question> {
    await this.roomsService.throwErrorIfRoomNotFound(roomId);

    const answer = await this.generateAnswer({ roomId, question });

    return this.questionsRepository.create({
      roomId,
      question,
      answer,
    });
  }

  private async generateAnswer({
    roomId,
    question,
  }: CreateAnswerData): Promise<string | null> {
    const embedding =
      await this.geminiService.generateEmbeddingsFromText(question);

    const chunks = await this.audioService.findTopBySemanticSimilarity(
      roomId,
      embedding,
    );

    let answer: string | null = null;

    const MIN_SIMILARITY = 0.45;

    const validChunks = chunks.filter(
      (chunk) => chunk.similarity >= MIN_SIMILARITY,
    );

    if (validChunks.length <= 0) return null;

    const transcriptions = validChunks.map((chunk) => chunk.transcription);

    answer = await this.geminiService.generateAnswer(question, transcriptions);

    return answer;
  }
}
