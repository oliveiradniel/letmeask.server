import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { GeminiService } from '../gemini/gemini.service';
import { AudioService } from '../audio/audio.service';

import { RoomsRepository } from './rooms.repository';
import { QuestionsRepository } from '../questions/questions.repository';

import type { Room } from 'src/entities/Room';
import type { Question } from 'src/entities/Question';
import type { CreateRoomData } from './types/create-room-data.type';
import type { RoomWithQuestionCount } from './types/room-with-question-count.type';
import { CreateAnswerData } from './types/create-answer-data.type';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly questionsRepository: QuestionsRepository,
    private readonly geminiService: GeminiService,
    private readonly audioService: AudioService,
  ) {}

  findAll(): Promise<RoomWithQuestionCount[]> {
    return this.roomsRepository.getAll();
  }

  async findQuestionsByRoomId(roomId: string): Promise<Question[]> {
    await this.throwErrorIfRoomNotFound(roomId);

    return this.questionsRepository.getQuestionsByRoomId(roomId);
  }

  async create(data: CreateRoomData): Promise<Room> {
    await this.ensureNameIsUnique(data.name);

    return this.roomsRepository.create(data);
  }

  async createQuestion(roomId: string, question: string): Promise<Question> {
    await this.throwErrorIfRoomNotFound(roomId);

    const answer = await this.createAnswer({ roomId, question });

    return this.questionsRepository.create({
      roomId,
      question,
      answer,
    });
  }

  private async createAnswer({
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

  async ensureNameIsUnique(name: string): Promise<void> {
    const foundRoom = await this.roomsRepository.getByName(name);

    if (foundRoom) {
      throw new ConflictException('This name already in use.');
    }
  }

  async throwErrorIfRoomNotFound(id: string): Promise<void> {
    const foundRoom = await this.roomsRepository.getById(id);

    if (!foundRoom) {
      throw new NotFoundException('Room not found.');
    }
  }
}
