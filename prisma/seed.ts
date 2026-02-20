/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { Pool } from 'pg';

import { faker } from '@faker-js/faker';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined!');
}

const pool = new Pool({ connectionString });

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  await prisma.question.deleteMany();
  await prisma.room.deleteMany();

  function makeQuestions({
    quantity,
    roomId,
  }: {
    quantity: number;
    roomId: string;
  }) {
    return Array.from({ length: quantity }).map(() => ({
      roomId,
      question: faker.lorem.sentence(),
      answer: faker.lorem.sentence(),
    }));
  }

  function makeRooms({
    quantityRooms,
  }: {
    quantityRooms: number;
    quantityQuestions?: number;
  }) {
    return Array.from({ length: quantityRooms }).map(() => ({
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    }));
  }

  const TOTAL_ROOMS = 10;
  const TOTAL_QUESTIONS = 5;

  const rooms = await prisma.room.createManyAndReturn({
    data: makeRooms({ quantityRooms: TOTAL_ROOMS }),
  });

  await prisma.question.createMany({
    data: rooms.flatMap((room) =>
      makeQuestions({ quantity: TOTAL_QUESTIONS, roomId: room.id }),
    ),
  });
}

main()
  .then(() => console.log('Successfully executed seed'))
  .catch((error) => {
    console.log(error);
    console.log('Error while executing seed');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
