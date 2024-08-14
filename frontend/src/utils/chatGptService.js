import axios from "axios";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

export const getChatResponse = async (prompt) => {
	try {
		if (!token) {
			throw new Error("No token found in localStorage");
		}
		const response = await axios.post(
			// `http://localhost:5173/api/chat/generate`,
			`https://fit-mate.onrender.com/api/chat/generate`,
			{ prompt },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log("response in chatGptService", response);
		return response.data;
	} catch (error) {
		console.log("Error generating chat", error);
		return { error: "Failed to fetch response from ChatGPT." };
	}
};

export const getExistingPlan = async () => {
	try {
		if (!token) {
			throw new Error("No token found in localStorage");
		}
		const response = await axios.get(
			// `http://localhost:5173/api/workouts/${user._id}`,
			`https://fit-mate.onrender.com/api/workouts/${user._id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log("response in chatGptService", response);
		return response.data;
	} catch (error) {
		console.log("Error fetching existing plans", error);
		return { error: "Failed to fetch existing plans" };
	}
};

//hard coded chat data for testing
export const chatData = {
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
					done: false,
				},
			],
		},
		{
			day: "Wednesday",
			exercisesList: [
				{
					name: "Running",
					sets: 1,
					reps: null,
					duration: "30 minutes",
					restTime: "5 minutes",
					description:
						"Interval running: 2 minutes fast pace followed by 2 minutes slow pace, repeat for 30 minutes.",
					done: false,
				},
				{
					name: "Bodyweight Squats",
					sets: 3,
					reps: 10,
					duration: null,
					restTime: "1 minute",
					description: "Focus on proper form and controlled movements.",
					done: false,
				},
			],
		},
		{
			day: "Friday",
			exercisesList: [
				{
					name: "Running",
					sets: 1,
					reps: null,
					duration: "30 minutes",
					restTime: "5 minutes",
					description: "Easy jog to recover while still staying active.",
					done: false,
				},
				{
					name: "Plank",
					sets: 3,
					reps: null,
					duration: "30 seconds",
					restTime: "1 minute",
					description:
						"Maintain a straight line from head to heels, engage core.",
					done: false,
				},
			],
		},
		{
			day: "Sunday",
			exercisesList: [
				{
					name: "Running",
					sets: 1,
					reps: null,
					duration: "30 minutes",
					restTime: "5 minutes",
					description:
						"Fartlek training: alternate between sprinting and walking for improved speed and endurance.",
					done: false,
				},
				{
					name: "Lunges",
					sets: 3,
					reps: 10,
					duration: null,
					restTime: "1 minute",
					description: "Step forward into a lunge, alternating legs.",
					done: false,
				},
			],
		},
	],
	notes:
		"Ensure adequate hydration and maintain a balanced diet. Listen to your body and adjust the intensity as needed.",
};
