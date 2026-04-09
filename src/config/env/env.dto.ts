import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
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

  @IsString()
  @Matches(/^postgres(ql)?:\/\//)
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsString()
  @IsNotEmpty()
  FRONT_END_ORIGIN!: string;

  @IsString()
  @IsNotEmpty()
  GEMINI_API_KEY!: string;
}
