import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RoomsRepository } from './rooms.repository';
import { QuestionsRepository } from '../questions/questions.repository';

import type { Room } from 'src/entities/Room';
import type { Question } from 'src/entities/Question';
import type { CreateRoomData } from './types/create-room-data.type';
import type { CreateQuestionData } from '../questions/types/create-question-data.type';
import type { RoomWithQuestionCount } from './types/room-with-question-count.type';

type CreateQuestion = {
  roomId: string;
  data: CreateQuestionData;
};

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly questionsRepository: QuestionsRepository,
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

  async createQuestion({ roomId, data }: CreateQuestion): Promise<Question> {
    await this.throwErrorIfRoomNotFound(roomId);

    return this.questionsRepository.create({
      ...data,
      room: {
        connect: { id: roomId },
      },
    });
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
