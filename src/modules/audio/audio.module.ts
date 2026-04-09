import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';

import { AudioService } from './audio.service';

import { AudioController } from './audio.controller';

@Module({
  imports: [GeminiModule],
  providers: [AudioService],
  controllers: [AudioController],
  exports: [AudioService],
})
export class AudioModule {}
