import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";

async function connectDB() {
    return await mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
}

export default connectDB;
