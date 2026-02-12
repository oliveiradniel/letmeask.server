import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from './config/env/types/node-env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);

  const PORT = configService.getOrThrow<number>('PORT');
  const NODE_ENV = configService.getOrThrow<NodeEnv>('NODE_ENV');

  await app.listen(PORT);

  if (NODE_ENV !== NodeEnv.PRODUCTION) {
    console.log(`Server started at port ${PORT}`);
  }
}

void bootstrap();
