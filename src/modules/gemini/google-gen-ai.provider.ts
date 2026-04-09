import { GoogleGenAI } from '@google/genai';

import { EnvService } from 'src/config/env/env.service';

export const GOOGLE_GEN_AI = Symbol('GOOGLE_GEN_AI');

export const googleGenAIProvider = {
  provide: GOOGLE_GEN_AI,
  useFactory: (envService: EnvService) => {
    return new GoogleGenAI({
      apiKey: envService.geminiAPIKey,
    });
  },
  inject: [EnvService],
};
