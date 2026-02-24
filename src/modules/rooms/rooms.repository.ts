import { Injectable } from '@nestjs/common';

import { Prisma, Room } from '@prisma/client';

import { PrismaService } from 'src/infra/database/prisma.service';

import { IRoomsRepository } from './contracts/rooms-repository.contract';
import { RoomWithQuestionCount } from './types/room-with-question-count.type';
import { RoomMapper } from './mappers/room.mapper';

@Injectable()
export class RoomsRepository implements IRoomsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<RoomWithQuestionCount[]> {
    const rooms = await this.prismaService.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        _count: {
          select: { questions: true },
        },
      },
    });

    return RoomMapper.toDomainList(rooms);
  }

  getById(id: string): Promise<Room | null> {
    return this.prismaService.room.findUnique({
      where: {
        id,
      },
    });
  }

  getByName(name: string): Promise<Room | null> {
    return this.prismaService.room.findFirst({
      where: {
        name,
      },
    });
  }

  create(data: Prisma.RoomCreateInput): Promise<Room> {
    return this.prismaService.room.create({
      data,
    });
  }
}
