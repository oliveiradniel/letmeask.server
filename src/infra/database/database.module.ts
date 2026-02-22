import { Global, Module } from '@nestjs/common';
import { EnvModule } from 'src/config/env/env.module';

import { PrismaService } from './prisma.service';

import { RoomsRepository } from 'src/modules/rooms/rooms.repository';
import { QuestionsRepository } from 'src/modules/questions/questions.repository';

@Global()
@Module({
  imports: [EnvModule],
  providers: [PrismaService, RoomsRepository, QuestionsRepository],
  exports: [PrismaService, RoomsRepository, QuestionsRepository],
})
export class DatabaseModule {}
