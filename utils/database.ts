import mongoose from "mongoose";

let isConnected = false; // Track connection state

export const connectToDb = async (): Promise<void> => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB already connected");
        return; // Return early if already connected
    }

    const MONGODB_URI = process.env.MONGODB_URI as string;

    if (!MONGODB_URI) {
        console.error("Error: MONGODB_URI is not defined.");
        return; // Exit early if the URI is not defined
    }

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true; // Mark as connected
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error for higher-level handling
    }
};
