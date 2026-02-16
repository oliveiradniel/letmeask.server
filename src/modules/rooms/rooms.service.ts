import { Injectable } from '@nestjs/common';

import { RoomsRepository } from 'src/infra/database/repositories/rooms.repository';

import type { Room } from 'src/entities/Room';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  findAll(): Promise<Room[]> {
    return this.roomsRepository.getAll();
  }
}
