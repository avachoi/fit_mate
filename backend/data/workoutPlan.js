import mongoose from "mongoose";
import WorkoutPlan from "../models/WorkoutPlan.js";

// const newWorkoutPlan = new WorkoutPlan({
// 	userId: new mongoose.Types.ObjectId("66b59b2bb5bf29f42007ca6a"),
// 	planName: "Beginner Plan",
// 	goal: "Lose Weight",
// 	durationWeeks: 12,
// 	frequencyPerWeek: 3,
// 	exercises: [
// 		{
// 			day: "Monday",
// 			exercisesList: [
// 				{
// 					name: "Push-ups",
// 					sets: 3,
// 					reps: 15,
// 					duration: "N/A",
// 					restTime: "1 min",
// 					description: "Standard push-ups",
// 					done: false,
// 				},
// 			],
// 		},
// 	],
// 	notes: "Start with a warm-up",
// });

const newWorkoutPlan = [
	{
		userId: new mongoose.Types.ObjectId("66b59b2bb5bf29f42007ca6a"),
		planName: "Beginner Plan",
		goal: "Lose Weight",
		durationWeeks: 12,
		frequencyPerWeek: 3,
		exercises: [
			{
				day: "Monday",
				exercisesList: [
					{
						name: "Push-ups",
						sets: 3,
						reps: 15,
						duration: "N/A",
						restTime: "1 min",
						description: "Standard push-ups",
						done: false,
					},
				],
			},
		],
		notes: "Start with a warm-up",
	},
];

// newWorkoutPlan
// 	.save()
// 	.then(() => console.log("Workout plan saved successfully"))
// 	.catch((error) => console.error("Error saving workout plan:", error));

export default newWorkoutPlan;
