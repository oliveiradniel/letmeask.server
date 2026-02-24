import { Prisma } from '@prisma/client';

export type RoomWithQuestionCountPrisma = Prisma.RoomGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    createdAt: true;
    _count: {
      select: {
        questions: true;
      };
    };
  };
}>;
