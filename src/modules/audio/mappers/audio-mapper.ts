import type { PrismaCreateAudioReturn } from '../types/prisma-create-audio-return.type';
import type { PrismaAudioChunkSemanticSimilarity } from '../types/prisma-audio-chunk-semantic-similarity.type';
import type { AudioChunkSemanticSimilarity } from '../types/audio-chunk-semantic-similarity.type';
import type { AudioChunkWithoutEmbedding } from '../types/audio-chunk-without-embedding';

export class AudioMapper {
  static toDomainCreate(
    audio: PrismaCreateAudioReturn,
  ): AudioChunkWithoutEmbedding {
    return {
      id: audio.id,
      roomId: audio.room_id,
      transcription: audio.transcription,
      createdAt: new Date(audio.created_at),
    };
  }

  static toDomainSimilarity(
    audio: PrismaAudioChunkSemanticSimilarity,
  ): AudioChunkSemanticSimilarity {
    return {
      id: audio.id,
      transcription: audio.transcription,
      similarity: audio.similarity,
    };
  }
}
