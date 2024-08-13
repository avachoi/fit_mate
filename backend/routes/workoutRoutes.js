import express from "express";
const router = express.Router();
import WorkoutPlan from "../models/WorkoutPlan.js";
import Users from "../models/User.js";

//Routes for "/api/workouts"

// Get a workout plans for a user
router.get("/:id", async (req, res) => {
	try {
		const user = await Users.findOne({ _id: req.params.id });

		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		if (!user.userPlans || user.userPlans.length === 0) {
			console.log("no plan?!", user.userPlans);
			res.json(user.userPlans);
		} else {
			const lastPlanId = user.userPlans[user.userPlans.length - 1].toString();

			const plan = await WorkoutPlan.findOne({ _id: lastPlanId });
			if (!plan) {
				console.log("no plan found!!");
				return res.status(404).send("Workout plan not found");
			}
			console.log;
			res.json(plan);
		}
	} catch (error) {
		console.error("Error fetching workout plan", error);
		res.status(500).send("Error fetching workout plan");
	}
});

// Create a new workout plan
router.post("/:id", async (req, res) => {
	try {
		const newPlan = req.body;
		const createdPlan = await WorkoutPlan.create({
			userId: req.params.id,
			planName: newPlan.planName,
			goal: newPlan.goal,
			durationWeeks: newPlan.durationWeeks,
			frequencyPerWeek: newPlan.frequencyPerWeek,
			exercises: newPlan.exercises.map((exercise) => ({
				day: exercise.day,
				exercisesList: exercise.exercisesList.map((exerciseItem) => ({
					name: exerciseItem.name,
					sets: exerciseItem.sets,
					reps: exerciseItem.reps,
					duration: exerciseItem.duration,
					restTime: exerciseItem.restTime,
					description: exerciseItem.description,
				})),
			})),
			notes: newPlan.notes,
		});
		res.status(201).json(createdPlan);
	} catch (error) {
		console.log("Error creating a new workout", error);
		res.status(500).send("Error creating a new workout");
	}
});

//toggle exercise done
router.put(
	"/:planId/exercise/:exerciseId/:exerciseListId/toggle",
	async (req, res) => {
		try {
			const { planId, exerciseId, exerciseListId } = req.params;
			const workoutPlan = await WorkoutPlan.findOne({ _id: planId });
			if (!workoutPlan) {
				res.status(404).send("Workout plan not found");
				return;
			}
			let exerciseFound = false;
			workoutPlan.exercises.forEach((exercise) => {
				if (exercise._id.toString() === exerciseId) {
					exercise.exercisesList.forEach((exerciseItem) => {
						if (exerciseItem._id.toString() === exerciseListId) {
							// Toggle the 'done' field
							exerciseItem.done = !exerciseItem.done;
							exerciseFound = true;
						}
					});
				}
			});

			if (!exerciseFound) {
				return res.status(404).send("Exercise not found");
			}

			// Save the updated workout plan
			await workoutPlan.save();

			res.status(200).json(workoutPlan);
		} catch (error) {
			console.log("Error toggling exercise done field", error);
			res.status(500).send("Error toggling exercise done field");
		}
	}
);

export default router;
