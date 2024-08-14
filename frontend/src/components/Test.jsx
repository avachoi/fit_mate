//just for the saving

import React, { useState, useEffect } from "react";
import {
	getChatResponse,
	getExistingPlan,
	chatData,
} from "../utils/chatGptService";

function WorkoutPlanGenerator() {
	const [chatResponse, setChatResponse] = useState("");
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [error, setError] = useState(null);

	useEffect(() => {
		// Call the API to get the existing plan
		// if (user.userPlans.length === 0) {
		// 	setChatResponse("");
		// }
		// else {
		getExistingPlan().then((response) => {
			setChatResponse(response);
		});
		// }
	}, []);

	const handleChatSubmit = async (e) => {
		e.preventDefault();
		try {
			setChatResponse("loading");
			const response = await getChatResponse("");
			setChatResponse(response);

			//for testing frontend without backend
			// setChatResponse(chatData);
		} catch (err) {
			console.error("Error fetching chat response:", err);
			setError("Failed to fetch chat response. Please try again.");
		}
	};
	console.log("chatResponse", chatResponse);
	return (
		<div>
			<div className="planPage">
				<form onSubmit={handleChatSubmit}>
					<button type="submit" className="generator">
						Generate Plans
					</button>
				</form>
				{error && <p style={{ color: "red" }}>{error}</p>}
				{chatResponse === "loading" ? (
					<div className="loader-container">
						<div className="bouncing-dots">
							<div className="dot"></div>
							<div className="dot"></div>
							<div className="dot"></div>
						</div>
					</div>
				) : (
					<div>
						<h3 className="saying1">{chatResponse.planName}</h3>
						{/* Access other properties as needed */}
						<p className="saying2">Goal: {chatResponse.goal}</p>
						<p className="saying2">
							Frequency: {chatResponse.frequencyPerWeek} times per week
						</p>
						{/* Render exercises */}
						{chatResponse.exercises.map((exercise, index) => (
							<div key={index}>
								<h3 className="day">{exercise.day}</h3>
								<table className="planTable">
									<thead>
										<tr className="planHead">
											<th>Exercise</th>
											<th>Sets</th>
											<th>Reps</th>
											<th>Duration</th>
											<th>Rest</th>
											<th>Done</th>
										</tr>
									</thead>
									<tbody>
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
									</tbody>
								</table>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default WorkoutPlanGenerator;
