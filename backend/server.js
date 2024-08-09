import express from "express";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";

const app = express();

app.use(express.json());

/////////////////////////////ROUTES////////////////////////
app.use("/api/users", userRoutes);
app.use("./api/workouts", workoutRoutes);

////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);

	dbConnect();
});
