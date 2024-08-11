import axios from "axios";

export const getChatResponse = async (prompt) => {
	try {
		const response = await axios.post(
			"http://localhost:5173/api/chat/generate",
			{ prompt },
			{ headers: { "Content-Type": "application/json" } }
		);
		console.log("response.data", response.data);
		return response.data;
	} catch (error) {
		console.log("Error generating chat", error);
		return { error: "Failed to fetch response from ChatGPT." };
	}
};
