import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { NodeEnv } from './types/node-env';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  PORT: number = 3001;

  @IsEnum(NodeEnv)
  @IsDefined()
  NODE_ENV!: NodeEnv;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB!: string;
}
