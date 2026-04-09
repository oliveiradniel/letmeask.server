import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';
import { AudioModule } from '../audio/audio.module';

import { RoomsService } from './rooms.service';

import { RoomsController } from './rooms.controller';

@Module({
  imports: [GeminiModule, AudioModule],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
