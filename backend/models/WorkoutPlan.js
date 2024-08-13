import mongoose from "mongoose";
const WorkoutPlanSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	planName: { type: String, required: true },
	goal: { type: String },
	durationWeeks: { type: Number },
	frequencyPerWeek: { type: Number },
	exercises: [
		{
			day: { type: String },
			exercisesList: [
				{
					name: { type: String },
					sets: { type: String },
					reps: { type: String },
					duration: { type: String },
					restTime: { type: String },
					description: { type: String },
					done: { type: Boolean },
				},
			],
		},
	],
	notes: { type: String },
});

export default mongoose.model("WorkoutPlan", WorkoutPlanSchema);
