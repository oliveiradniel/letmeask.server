import { Global, Module } from '@nestjs/common';
import { EnvModule } from 'src/config/env/env.module';

import { PrismaService } from './prisma.service';

import { RoomsRepository } from 'src/modules/rooms/rooms.repository';
import { QuestionsRepository } from 'src/modules/questions/questions.repository';
import { AudioRepository } from 'src/modules/audio/audio.repository';

@Global()
@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    RoomsRepository,
    QuestionsRepository,
    AudioRepository,
  ],
  exports: [
    PrismaService,
    RoomsRepository,
    QuestionsRepository,
    AudioRepository,
  ],
})
export class DatabaseModule {}
