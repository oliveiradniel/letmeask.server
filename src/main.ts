import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodeEnv } from './config/env/types/node-env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const FRONT_END_ORIGIN = configService.getOrThrow<string>('FRONT_END_ORIGIN');

  app.enableCors({
    origin: FRONT_END_ORIGIN,
  });

  const config = new DocumentBuilder()
    .setTitle('Audio-Based Question Answering System - LetMeAsk')
    .setDescription(
      'Manages room sessions, processes audio via Gemini API (transcription and embeddings), and applies RAG (Retrievel-Augmented Generation) to deliver context-aware answers based on stored classroom data.',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(PORT);

  if (NODE_ENV !== NodeEnv.PRODUCTION) {
    console.log(`Server started at port ${PORT}`);
  }
}

void bootstrap();
