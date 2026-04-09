import type { RoomWithQuestionCount } from '../types/room-with-question-count.type';
import type { CreateRoomData } from '../types/create-room-data.type';
import type { Room } from 'src/entities/Room';

export abstract class IRoomsRepository {
  abstract getAll(): Promise<RoomWithQuestionCount[]>;
  abstract getById(id: string): Promise<Room | null>;
  abstract getByName(name: string): Promise<Room | null>;
  abstract create(data: CreateRoomData): Promise<Room>;
}
