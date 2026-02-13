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
}
