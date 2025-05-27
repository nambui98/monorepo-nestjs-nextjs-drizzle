import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../../../.env.local') });
config({ path: path.resolve(__dirname, '../.env.local') });
config({ path: path.resolve(__dirname, './.env.local') });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

console.log('Using database URL:', process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL;

// Disable prefetch for serverless environments
const client = postgres(connectionString, { 
    prepare: false,
    max: 10, // connection pool size
    idle_timeout: 20,
    connect_timeout: 10
});

export const db = drizzle(client, { schema });
export type Database = typeof db;