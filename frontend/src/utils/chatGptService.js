import axios from "axios";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

export const getChatResponse = async (prompt) => {
	try {
		if (!token) {
			throw new Error("No token found in localStorage");
		}
		const response = await axios.post(
			`http://localhost:5173/api/chat/generate`,
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
			`http://localhost:5173/api/workouts/${user._id}`,
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
