import { Prisma, Room } from '@prisma/client';

export abstract class IRoomsRepository {
  abstract getAll(): Promise<Room[]>;
  abstract getById(id: string): Promise<Room | null>;
  abstract getByName(name: string): Promise<Room | null>;
  abstract create(data: Prisma.RoomCreateInput): Promise<Room>;
}
