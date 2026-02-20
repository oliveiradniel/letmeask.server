import { ConflictException, Injectable } from '@nestjs/common';

import { RoomsRepository } from './rooms.repository';

import type { CreateRoomData } from './types/create-room-data.type';
import type { Room } from 'src/entities/Room';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  findAll(): Promise<Room[]> {
    return this.roomsRepository.getAll();
  }

  async ensureNameIsUnique(name: string): Promise<void> {
    const foundRoom = await this.roomsRepository.getByName(name);

    if (foundRoom) {
      throw new ConflictException('This name already in use.');
    }
  }

  async create(data: CreateRoomData) {
    await this.ensureNameIsUnique(data.name);

    return this.roomsRepository.create(data);
  }
}
