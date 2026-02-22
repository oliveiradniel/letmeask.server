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

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  findAll(): Promise<Room[]> {
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
