import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";
import jwt from "jsonwebtoken";

import Users from "../models/User.js";
import WorkoutPlan from "../models/WorkoutPlan.js";

dotenv.config();

const router = express.Router();
const openai = new OpenAI();

//Routes for "/api/chat"

router.post("/generate", async (req, res) => {
	const { prompt } = req.body;
	console.log("req.headers.auth", req.headers.authorization);
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}
	console.log("token in the router", token);
	// console.log("prompt in router", prompt);

	// You can now use userId to retrieve the user from the database, if needed

	// find a userData
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("decoded", decoded);
		const userData = await Users.findOne({ _id: decoded.userId });
		if (!userData) {
			return res.status(404).json({ error: "User not found" });
		}
		let userInfo = {
			userId: userData._id,
			age: userData.age,
			sex: userData.sex,
			goal: userData.goal,
			weight: userData.weight,
			Height: userData.height,
			fitnessLevel: userData.fitnessLevel,
			preferences: userData.preferences,
		};
		let chatInput = `
Generate a personalized workout plan for a user based on the following information:
User Info: ${JSON.stringify(userInfo)}

The workout plan should be structured as follows:

Workout Plan Schema:
{
  planName: "6-Week Weight Loss Plan",
  goal: "Lose Weight",
  durationWeeks: 6,
  frequencyPerWeek: 4,
  exercises: [
    {
      day: "Monday",
      exercisesList: [
        {
          name: "Running",
          sets: 1,
          reps: null,
          duration: "30 minutes",
          restTime: "5 minutes",
          description: "Moderate intensity run focusing on endurance",
          done: false
        },
        // Add more exercises as needed
      ]
    },
    // Add more days as needed
  ],
  notes: "Ensure adequate hydration and maintain a balanced diet."
}

Please generate the workout plan using the structure above and fill in the necessary details for the remaining days and exercises.
`;
		console.log("chatInput", chatInput);
		try {
			let workoutPlan;
			const completion = await openai.chat.completions.create({
				messages: [{ role: "system", content: chatInput }],
				model: "gpt-4o-mini",
			});

			const content = completion.choices[0].message.content;
			console.log("content", content);
			const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
			const match = content.match(jsonRegex);
			if (match && match[1]) {
				try {
					workoutPlan = JSON.parse(match[1]);
				} catch (error) {
					console.error("Failed to parse JSON:", error);
				}
			} else {
				console.log("No JSON content found in the response");
			}

			const createdPlan = await WorkoutPlan.create({
				userId: decoded.userId,
				planName: workoutPlan.planName,
				goal: workoutPlan.goal,
				durationWeeks: workoutPlan.durationWeeks,
				frequencyPerWeek: workoutPlan.frequencyPerWeek,
				exercises: workoutPlan.exercises.map((exercise) => ({
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
				notes: workoutPlan.notes,
			});
			await Users.updateOne(
				{ _id: userData._id },
				{ $push: { userPlans: createdPlan._id } }
			);
			res.json(workoutPlan);
		} catch (error) {
			if (error.response) {
				console.log(
					`Error generating chat: ${error.response.status} - ${error.response.statusText}`
				);
				console.log(error.response.data);
				res.status(error.response.status).json({ error: error.response.data });
			} else {
				console.log("Error generating chat", error);
				res.status(500).json({ error: "Error generating chat" });
			}
		}
	} catch (error) {
		console.error("Error fetching user data:", error);
		res.status(500).json({ error: "Error fetching user data" });
	}
});

export default router;
