import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma.service';

import { AudioMapper } from './mappers/audio-mapper';

import { IAudioRepository } from './contracts/audio-repository.contract';
import type { CreateAudioData } from './types/create-audio-data.type';
import type { PrismaCreateAudioReturn } from './types/prisma-create-audio-return.type';
import type { AudioChunkWithoutEmbedding } from './types/audio-chunk-without-embedding';
import type { AudioChunkSemanticSimilarity } from './types/audio-chunk-semantic-similarity.type';

@Injectable()
export class AudioRepository implements IAudioRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getTopBySemanticSimilarity(
    roomId: string,
    embedding: number[],
  ): Promise<AudioChunkSemanticSimilarity[]> {
    const vectorLiteral = `[${embedding.join(',')}]`;
    const embeddingRaw = Prisma.raw(`'${vectorLiteral}'::vector`);

    return this.prismaService.$queryRaw<AudioChunkSemanticSimilarity[]>`
      SELECT
        id,
        transcription,
        1.0 - (embedding <=> ${embeddingRaw}) AS similarity
      FROM audio_chunks
      WHERE room_id = ${roomId}
      ORDER BY embedding <=> ${embeddingRaw}
      LIMIT 3
    `;
  }

  async create({
    roomId,
    transcription,
    embeddings,
  }: CreateAudioData): Promise<AudioChunkWithoutEmbedding> {
    const createdAudio = await this.prismaService.$queryRaw<
      PrismaCreateAudioReturn[]
    >`
      INSERT INTO audio_chunks ("room_id", "transcription", "embedding")
        VALUES (
          ${roomId},
          ${transcription},
          ${JSON.stringify(embeddings)}::vector
        )
        RETURNING id, room_id, transcription, created_at;
    `;

    return AudioMapper.toDomainCreate(createdAudio[0]);
  }
}
