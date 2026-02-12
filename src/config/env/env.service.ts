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
}
