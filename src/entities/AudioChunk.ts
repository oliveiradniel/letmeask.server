export interface AudioChunk {
  id: string;
  roomId: string;
  transcription: string;
  embedding: number[];
  createdAt: Date;
}
