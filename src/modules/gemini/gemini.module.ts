import { Module } from '@nestjs/common';

import { GeminiService } from './gemini.service';

import { googleGenAIProvider } from './google-gen-ai.provider';

@Module({
  providers: [GeminiService, googleGenAIProvider],
  exports: [GeminiService],
})
export class GeminiModule {}
