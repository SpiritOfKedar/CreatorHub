import mongoose from 'mongoose';

let cached = global.__walletMongoose;

if (!cached) {
  cached = global.__walletMongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB using a cached Mongoose connection.
 * @returns {Promise<typeof mongoose>}
 */
export async function connectWalletDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Wallet configuration error. Missing MONGODB_URI.');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
