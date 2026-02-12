import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { NodeEnv } from './types/node-env';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  PORT: number = 3001;

  @IsEnum(NodeEnv)
  @IsDefined()
  NODE_ENV!: NodeEnv;
}
