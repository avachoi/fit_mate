import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import Users from "./models/User.js";
import users from "./data/users.js";
import WorkoutPlan from "./models/WorkoutPlan.js";
import newWorkoutPlans from "./data/workoutPlan.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

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
app.get("/api", (req, res) => {
	console.log("Is API running?");
	res.send("API is running...");
});

app.get("/hello", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/workout", workoutRoutes);

app.get("/seed", async (req, res) => {
	await Users.deleteMany({});
	const userList = await Users.insertMany(users);

	await WorkoutPlan.deleteMany({});
	const workoutPlanList = await WorkoutPlan.insertMany(newWorkoutPlans);
	res.json([{ userList }, { workoutPlanList }]);
});

////////////////////ERROR HANDLERS///////////////////////
// 404 error handler for undefined endpoints
app.use((req, res, next) => {
	res.status(404).send("Endpoint not found");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

//////////////////////////////////////////////////
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
