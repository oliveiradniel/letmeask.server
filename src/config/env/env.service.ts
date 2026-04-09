import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { NodeEnv } from './types/node-env';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.getOrThrow<number>('PORT');
  }

  get nodeEnv(): NodeEnv {
    return this.configService.getOrThrow<NodeEnv>('NODE_ENV');
  }

  get postgresUser(): string {
    return this.configService.getOrThrow<string>('POSTGRES_USER');
  }

  get postgresPassword(): string {
    return this.configService.getOrThrow<string>('POSTGRES_PASSWORD');
  }

  get postgresDB(): string {
    return this.configService.getOrThrow<string>('POSTGRES_DB');
  }

  get databaseURL(): string {
    return this.configService.getOrThrow<string>('DATABASE_URL');
  }

  get frontEndOrigin(): string {
    return this.configService.getOrThrow<string>('FRONT_END_ORIGIN');
  }

  get geminiAPIKey(): string {
    return this.configService.getOrThrow<string>('GEMINI_API_KEY');
  }
}
