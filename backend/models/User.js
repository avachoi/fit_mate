import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	fitnessLevel: { type: String },
	preferences: { type: [String] },
	goal: { type: String },
	weight: { type: Number },
	height: { type: Number },
	sex: { type: String },
	userPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan" }],
});

export default mongoose.model("User", UserSchema);
