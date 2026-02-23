import { Prisma, Question } from '@prisma/client';

export abstract class IQuestionsRepository {
  abstract getQuestionsByRoomId(id: string): Promise<Question[]>;
  abstract create(data: Prisma.QuestionCreateManyInput): Promise<Question>;
}
