import { Injectable } from '@nestjs/common';

import { RoomsRepository } from './rooms.repository';

import type { CreateRoomData } from './types/create-room-data.type';
import type { Room } from 'src/entities/Room';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  findAll(): Promise<Room[]> {
    return this.roomsRepository.getAll();
  }

  create(data: CreateRoomData) {
    return this.roomsRepository.create(data);
  }
}
