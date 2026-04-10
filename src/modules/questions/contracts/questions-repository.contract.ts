import type { Question } from 'src/entities/Question';
import type { CreateQuestionData } from '../types/create-question-data.type';

export abstract class IQuestionsRepository {
  abstract getByRoomId(id: string): Promise<Question[]>;
  abstract create(data: CreateQuestionData): Promise<Question>;
}
