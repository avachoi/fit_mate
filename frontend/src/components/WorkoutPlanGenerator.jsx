import React, { useState, useEffect } from "react";
import { getChatResponse } from "../utils/chatGptService";

function WorkoutPlanGenerator() {
	const [chatPrompt, setChatPrompt] = useState("");
	const [chatResponse, setChatResponse] = useState("");
	const [error, setError] = useState(null);

	const handleChatPromptChange = (e) => {
		setChatPrompt(e.target.value);
	};

	const handleChatSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await getChatResponse(chatPrompt);
			const message = response.message.content;
			console.log("message:", message);
			const parsedMessage = JSON.parse(message);
			setChatResponse(parsedMessage);
		} catch (err) {
			console.error("Error fetching chat response:", err);
			setError("Failed to fetch chat response. Please try again.");
		}
	};

	return (
		<div>
			<h1>Workout Plan Generator</h1>
			<form onSubmit={handleChatSubmit}>
				<label htmlFor="chat-prompt">Chat Prompt:</label>
				<input
					type="text"
					id="chat-prompt"
					value={chatPrompt}
					onChange={handleChatPromptChange}
				/>
				<button type="submit">Generate Chat Response</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{chatResponse && (
				<div>
					<h2>Chat Response:</h2>
					<p>{chatResponse.planName}</p>
					{/* Access other properties as needed */}
					<p>Goal: {chatResponse.goal}</p>
					<p>Duration: {chatResponse.durationWeeks} weeks</p>
					<p>Frequency: {chatResponse.frequencyPerWeek} times per week</p>
					{/* Render exercises */}
					{chatResponse.exercises &&
						chatResponse.exercises.map((exercise, index) => (
							<div key={index}>
								<h3>{exercise.day}</h3>
								{exercise.exercisesList.map((ex, idx) => (
									<p key={idx}>
										{ex.name}: {ex.duration}
									</p>
								))}
							</div>
						))}
				</div>
			)}
		</div>
	);
}

export default WorkoutPlanGenerator;
