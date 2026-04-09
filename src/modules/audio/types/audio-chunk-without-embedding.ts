import { AudioChunk } from 'src/entities/AudioChunk';

export type AudioChunkWithoutEmbedding = Omit<AudioChunk, 'embedding'>;
