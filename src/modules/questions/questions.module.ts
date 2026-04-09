import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';
import { AudioModule } from '../audio/audio.module';
import { RoomsModule } from '../rooms/rooms.module';

import { QuestionsService } from './questions.service';

import { QuestionsController } from './questions.controller';

@Module({
  imports: [GeminiModule, AudioModule, RoomsModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
