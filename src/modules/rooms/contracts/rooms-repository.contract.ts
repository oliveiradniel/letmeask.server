import { Prisma, Room } from '@prisma/client';

export abstract class IRoomsRepository {
  abstract getAll(): Promise<Room[]>;
  abstract getByName(name: string): Promise<Room | null>;
  abstract create(data: Prisma.RoomCreateInput): Promise<Room>;
}
