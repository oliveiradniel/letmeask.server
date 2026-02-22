import { Injectable } from '@nestjs/common';

import { Question } from '@prisma/client';

import { PrismaService } from 'src/infra/database/prisma.service';

import { IQuestionsRepository } from './contracts/questions-repository.contract';

@Injectable()
export class QuestionsRepository implements IQuestionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getQuestionsByRoomId(id: string): Promise<Question[]> {
    return this.prismaService.question.findMany({
      where: {
        id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
