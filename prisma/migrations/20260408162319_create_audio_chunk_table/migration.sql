-- CreateTable
CREATE TABLE "audio_chunks" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "room_id" UUID NOT NULL,
    "transcription" TEXT NOT NULL,
    "embedding" vector(768),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audio_chunks_pkey" PRIMARY KEY ("id")
);
