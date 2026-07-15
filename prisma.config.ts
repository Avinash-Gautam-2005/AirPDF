import path from 'node:path';
import { defineConfig } from 'prisma/config';

// Load environment variables
import { config } from 'dotenv';
config();

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  
  // Required for prisma db push and migrate
  datasource: {
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? '',
  },
});
