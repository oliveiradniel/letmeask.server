import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './config/env/env.module';
import { DatabaseModule } from './infra/database/database.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AudioModule } from './modules/audio/audio.module';

import { EnvironmentVariablesDTO } from './config/env/env.dto';

import { envValidate } from './config/env/env.validate';

@Module({
  imports: [
    ConfigModule.forRoot<EnvironmentVariablesDTO>({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config) => envValidate(config, EnvironmentVariablesDTO),
    }),
    EnvModule,
    DatabaseModule,
    RoomsModule,
    AudioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
