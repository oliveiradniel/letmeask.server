import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/database/prisma.service';

import { IQuestionsRepository } from './contracts/questions-repository.contract';

import type { Question } from 'src/entities/Question';
import type { CreateQuestionData } from './types/create-question-data.type';

@Injectable()
export class QuestionsRepository implements IQuestionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getByRoomId(roomId: string): Promise<Question[]> {
    return this.prismaService.question.findMany({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create({
    roomId,
    question,
    answer,
  }: CreateQuestionData): Promise<Question> {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return this.prismaService.question.create({
      data: {
        roomId,
        question,
        answer,
      },
    });
  }
}
