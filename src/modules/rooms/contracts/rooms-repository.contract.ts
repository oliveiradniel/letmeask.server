import { Prisma, type Room } from '@prisma/client';

import type { RoomWithQuestionCount } from '../types/room-with-question-count.type';

export abstract class IRoomsRepository {
  abstract getAll(): Promise<RoomWithQuestionCount[]>;
  abstract getById(id: string): Promise<Room | null>;
  abstract getByName(name: string): Promise<Room | null>;
  abstract create(data: Prisma.RoomCreateInput): Promise<Room>;
}
