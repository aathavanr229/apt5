import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

let lastErrorTime = 0;
const RETRY_COOLDOWN_MS = 25000; // 25s cooldown between connection retries

/**
 * Reusable cached MongoDB connection handler optimized for Vercel Serverless & local Node environments.
 * Prevents connection leakage and gracefully falls back without crashing the server.
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Prevent connection spamming if a recent attempt timed out
  if (Date.now() - lastErrorTime < RETRY_COOLDOWN_MS && !cached.promise) {
    return null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 4000,
    };

    cached.promise = mongoose.connect(uri, opts)
      .then((m) => {
        console.log('MongoDB Atlas connection established successfully.');
        return m;
      })
      .catch((err) => {
        lastErrorTime = Date.now();
        cached.promise = null;
        cached.conn = null;
        if (err.name === 'MongooseServerSelectionError') {
          console.warn('MongoDB Atlas notice: IP address not yet whitelisted on Atlas (Network Access -> Add 0.0.0.0/0). Platform operating smoothly using the persistent local database.');
        } else {
          console.warn('MongoDB connection notice:', err.message);
        }
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.promise = null;
    cached.conn = null;
  }

  return cached.conn;
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getDatabaseState(): { connected: boolean; readyState: number; status: string } {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const state = mongoose.connection.readyState;
  return {
    connected: state === 1,
    readyState: state,
    status: states[state] || 'unknown',
  };
}
