import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentVariablesDTO } from './config/env/env.dto';
import { envValidate } from './config/env/env.validate';
import { EnvModule } from './config/env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot<EnvironmentVariablesDTO>({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config) => envValidate(config, EnvironmentVariablesDTO),
    }),
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
