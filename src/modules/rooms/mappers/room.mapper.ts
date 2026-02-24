import type { RoomWithQuestionCount } from '../types/room-with-question-count.type';
import type { RoomWithQuestionCountPrisma } from '../types/room-with-question-count-prisma.type';

export class RoomMapper {
  static toDomain(room: RoomWithQuestionCountPrisma): RoomWithQuestionCount {
    return {
      id: room.id,
      name: room.name,
      description: room.description,
      createdAt: room.createdAt,
      questionCount: room._count.questions,
    };
  }

  static toDomainList(
    rooms: RoomWithQuestionCountPrisma[],
  ): RoomWithQuestionCount[] {
    return rooms.map((room) => RoomMapper.toDomain(room));
  }
}
