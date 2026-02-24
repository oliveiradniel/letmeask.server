import { Injectable } from '@nestjs/common';

import { Prisma, Question } from '@prisma/client';

import { PrismaService } from 'src/infra/database/prisma.service';

import { IQuestionsRepository } from './contracts/questions-repository.contract';

@Injectable()
export class QuestionsRepository implements IQuestionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getQuestionsByRoomId(roomId: string): Promise<Question[]> {
    return this.prismaService.question.findMany({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(data: Prisma.QuestionCreateInput): Promise<Question> {
    return this.prismaService.question.create({
      data,
    });
  }
}
