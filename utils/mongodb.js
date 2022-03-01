import { MongoClient } from 'mongodb';
const { COSMOSDB_URI, DATABASE } = process.env;

if (!COSMOSDB_URI) {
    throw new Error(
        'Please define the COSMOSDB_URI environment variable in the .env file'
    )
}

if (!DATABASE) {
    throw new Error(
        'Please define the DATABASE environment variable in the .env file'
    )
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        cached.promise = MongoClient.connect(COSMOSDB_URI, opts).then(client => {
            return {
                client,
                db: client.db(DATABASE)
            }
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}