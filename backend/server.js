import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import chatGptRoutes from "./routes/chatGptRoutes.js";
import Users from "./models/User.js";
import users from "./data/users.js";
import WorkoutPlan from "./models/WorkoutPlan.js";
import newWorkoutPlans from "./data/workoutPlan.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

dbConnect();

app.use((req, res, next) => {
	const time = new Date();

	console.log(
		`-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
	);
	if (Object.keys(req.body).length > 0) {
		console.log("Containing the data:");
		console.log(`${JSON.stringify(req.body)}`);
	}
	next();
});

/////////////////////////////ROUTES////////////////////////

// API routes
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/chat", chatGptRoutes);

// Seed route
app.get("/seed", async (req, res) => {
	try {
		await Users.deleteMany({});
		await Users.insertMany(users);
		await WorkoutPlan.deleteMany({});
		await WorkoutPlan.insertMany(newWorkoutPlans);
		res.send("Database seeded!");
	} catch (error) {
		console.error(error);
		res.status(500).send("Error seeding database");
	}
});

// Serve the React app for all other routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

////////////////////ERROR HANDLERS/////////////////////// // 404 error handler for undefined endpoints
app.use((req, res, next) => {
	res.status(404).send("Endpoint not found");
});

//////////////////////////////////////////////////
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
