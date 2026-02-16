import { Room } from '@prisma/client';

export abstract class IRoomsRepository {
  abstract getAll(): Promise<Room[]>;
}
