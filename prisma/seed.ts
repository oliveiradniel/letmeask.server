import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

import { Pool } from 'pg';

import { faker } from '@faker-js/faker';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined!');
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const pool = new Pool({ connectionString });

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  await prisma.room.deleteMany();

  function makeRoom() {
    return {
      name: faker.company.name(),
      description: faker.lorem.sentence(),
    };
  }

  const TOTAL_ROOMS = 20;

  const rooms = Array.from({ length: TOTAL_ROOMS }).map(() => makeRoom());

  await prisma.room.createMany({ data: rooms });
}

main()
  .then(() => console.log('Successfully executed seed'))
  .catch(() => {
    console.log('Error while executing seed');
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
