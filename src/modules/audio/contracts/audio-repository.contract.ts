import type { CreateAudioData } from '../types/create-audio-data.type';
import type { AudioChunkWithoutEmbedding } from '../types/audio-chunk-without-embedding';
import type { AudioChunkSemanticSimilarity } from '../types/audio-chunk-semantic-similarity.type';

export abstract class IAudioRepository {
  abstract getTopBySemanticSimilarity(
    roomId: string,
    embedding: number[],
  ): Promise<AudioChunkSemanticSimilarity[]>;
  abstract create(data: CreateAudioData): Promise<AudioChunkWithoutEmbedding>;
}
