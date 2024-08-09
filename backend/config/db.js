import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function dbConnect() {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error("MONGODB_URI is not defined in the environment variables");
	}

	try {
		await mongoose.connect(uri, { dbName: "fitMate" });
		console.log("Successfully connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		throw error;
	}
}

export default dbConnect;
