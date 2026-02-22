import { Question } from '@prisma/client';

export abstract class IQuestionsRepository {
  abstract getQuestionsByRoomId(id: string): Promise<Question[]>;
}
