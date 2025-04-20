import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL!; // my mongodb url

// Check if we have a connection to the database or if it's currently connecting
if(!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}


export async function connectToDatabase() { // This function is used to connect to the database
    // If we have a connection, return it
    if (cached.conn) {
        return cached.conn;
    }

    // If we don't have a connection, create a new one
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then(() =>
            mongoose.connection);
    }

    // Wait for the connection to be made, then return it
    try{
        cached.conn = await cached.promise;
        return cached.conn;

    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn; // return the connection
}