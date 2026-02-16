import { Injectable } from '@nestjs/common';

import { Room } from '@prisma/client';

import { PrismaService } from '../prisma.service';

import { IRoomsRepository } from '../contracts/rooms-repository.contract';

@Injectable()
export class RoomsRepository implements IRoomsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getAll(): Promise<Room[]> {
    return this.prismaService.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
