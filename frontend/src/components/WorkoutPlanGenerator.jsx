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
			setChatResponse(message);
		} catch (err) {
			console.error("Error fetching chat response:", err);
			setError("Failed to fetch chat response. Please try again.");
		}
	};
	console.log("chatResponse", chatResponse);
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
					<p>{chatResponse}</p>
				</div>
			)}
		</div>
	);
}

export default WorkoutPlanGenerator;
