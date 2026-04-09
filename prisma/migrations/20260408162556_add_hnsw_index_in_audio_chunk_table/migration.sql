CREATE INDEX audio_embedding_hnsw_idx ON audio_chunks USING hnsw (embedding vector_cosine_ops);
