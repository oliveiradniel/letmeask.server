import { Prisma, Room } from '@prisma/client';

export abstract class IRoomsRepository {
  abstract getAll(): Promise<Room[]>;
  abstract create(data: Prisma.RoomCreateInput): Promise<Room>;
}
