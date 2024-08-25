//lib/utils/pinecone/pinecone.js

import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: '7eec3401-8bd9-43c8-8568-30a5bc47df54'
});
export const index = pc.index('chat-history');