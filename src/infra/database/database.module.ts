import { Global, Module } from '@nestjs/common';
import { EnvModule } from 'src/config/env/env.module';

import { PrismaService } from './prisma.service';

import { RoomsRepository } from 'src/modules/rooms/rooms.repository';

@Global()
@Module({
  imports: [EnvModule],
  providers: [PrismaService, RoomsRepository],
  exports: [PrismaService, RoomsRepository],
})
export class DatabaseModule {}
