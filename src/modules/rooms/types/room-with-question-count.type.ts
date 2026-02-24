import { Room } from 'src/entities/Room';

export type RoomWithQuestionCount = Room & { questionCount: number };
