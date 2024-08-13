import React, { useState, useEffect } from "react";
import { getChatResponse, getExistingPlan } from "../utils/chatGptService";

function WorkoutPlanGenerator() {
	const [chatResponse, setChatResponse] = useState("");
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [error, setError] = useState(null);
	// let chatData = {
	// 	planName: "6-Week Weight Loss Plan",
	// 	goal: "Lose Weight",
	// 	durationWeeks: 6,
	// 	frequencyPerWeek: 4,
	// 	exercises: [
	// 		{
	// 			day: "Monday",
	// 			exercisesList: [
	// 				{
	// 					name: "Running",
	// 					sets: 1,
	// 					reps: null,
	// 					duration: "30 minutes",
	// 					restTime: "5 minutes",
	// 					description: "Moderate intensity run focusing on endurance",
	// 					done: false,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			day: "Wednesday",
	// 			exercisesList: [
	// 				{
	// 					name: "Running",
	// 					sets: 1,
	// 					reps: null,
	// 					duration: "30 minutes",
	// 					restTime: "5 minutes",
	// 					description:
	// 						"Interval running: 2 minutes fast pace followed by 2 minutes slow pace, repeat for 30 minutes.",
	// 					done: false,
	// 				},
	// 				{
	// 					name: "Bodyweight Squats",
	// 					sets: 3,
	// 					reps: 10,
	// 					duration: null,
	// 					restTime: "1 minute",
	// 					description: "Focus on proper form and controlled movements.",
	// 					done: false,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			day: "Friday",
	// 			exercisesList: [
	// 				{
	// 					name: "Running",
	// 					sets: 1,
	// 					reps: null,
	// 					duration: "30 minutes",
	// 					restTime: "5 minutes",
	// 					description: "Easy jog to recover while still staying active.",
	// 					done: false,
	// 				},
	// 				{
	// 					name: "Plank",
	// 					sets: 3,
	// 					reps: null,
	// 					duration: "30 seconds",
	// 					restTime: "1 minute",
	// 					description:
	// 						"Maintain a straight line from head to heels, engage core.",
	// 					done: false,
	// 				},
	// 			],
	// 		},
	// 		{
	// 			day: "Sunday",
	// 			exercisesList: [
	// 				{
	// 					name: "Running",
	// 					sets: 1,
	// 					reps: null,
	// 					duration: "30 minutes",
	// 					restTime: "5 minutes",
	// 					description:
	// 						"Fartlek training: alternate between sprinting and walking for improved speed and endurance.",
	// 					done: false,
	// 				},
	// 				{
	// 					name: "Lunges",
	// 					sets: 3,
	// 					reps: 10,
	// 					duration: null,
	// 					restTime: "1 minute",
	// 					description: "Step forward into a lunge, alternating legs.",
	// 					done: false,
	// 				},
	// 			],
	// 		},
	// 	],
	// 	notes:
	// 		"Ensure adequate hydration and maintain a balanced diet. Listen to your body and adjust the intensity as needed.",
	// };
	useEffect(() => {
		// Call the API to get the existing plan
		if (user.userPlans.length === 0) {
			setChatResponse("");
		} else {
			getExistingPlan().then((response) => {
				setChatResponse(response);
			});
		}
	}, []);

	const handleChatSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await getChatResponse("");
			// const message = response.message.content;
			// console.log("message:", message);
			// const parsedMessage = JSON.parse(message);
			setChatResponse(response);
			// setChatResponse(chatData);
		} catch (err) {
			console.error("Error fetching chat response:", err);
			setError("Failed to fetch chat response. Please try again.");
		}
	};
	console.log("chatResponse", chatResponse);
	return (
		<div>
			<form onSubmit={handleChatSubmit}>
				<button type="submit">Generate Plans</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{chatResponse.planName && (
				<div>
					<h2>{chatResponse.planName}</h2>
					{/* Access other properties as needed */}
					<p>Goal: {chatResponse.goal}</p>
					<p>Frequency: {chatResponse.frequencyPerWeek} times per week</p>
					{/* Render exercises */}
					{chatResponse.exercises.map((exercise, index) => (
						<div key={index}>
							<h2>{exercise.day}</h2>
							<table>
								<tr>
									<th>Exercise</th>
									<th>Sets</th>
									<th>Reps</th>
									<th>Duration</th>
									<th>Rest</th>
									<th>Done</th>
								</tr>
								{exercise.exercisesList.map((ex, idx) => (
									<tr key={idx}>
										<td>{ex.name}</td>
										<td>{ex.sets}</td>
										<td>{ex.reps}</td>
										<td>{ex.duration}</td>
										<td>{ex.restTime}</td>
										<td>{ex.done ? "V" : "X"}</td>
									</tr>
								))}
							</table>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default WorkoutPlanGenerator;
