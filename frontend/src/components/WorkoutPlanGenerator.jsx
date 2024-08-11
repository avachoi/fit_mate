import React, { useState, useEffect } from "react";
import { getChatResponse } from "../utils/chatGptService";

function WorkoutPlanGenerator() {
	const [chatPrompt, setChatPrompt] = useState("");
	const [chatResponse, setChatResponse] = useState("");

	const handleChatPromptChange = (e) => {
		setChatPrompt(e.target.value);
	};

	const handleChatSubmit = async (e) => {
		e.preventDefault();
		const response = await getChatResponse(chatPrompt);
		setChatResponse(response);
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
