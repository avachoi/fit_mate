import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

const retryRequest = async (fn, retries = 10, delay = 2000) => {
	for (let i = 0; i < retries; i++) {
		try {
			return await fn();
		} catch (error) {
			if (error.response && error.response.status === 429 && i < retries - 1) {
				const retryAfter = error.response.headers["retry-after"]
					? parseInt(error.response.headers["retry-after"]) * 1000
					: delay * Math.pow(2, i);
				console.log(`Retry attempt ${i + 1} after ${retryAfter}ms`);
				await new Promise((resolve) => setTimeout(resolve, retryAfter));
			} else {
				throw error;
			}
		}
	}
};

router.post("/generate", async (req, res) => {
	const { prompt } = req.body;
	console.log("prompt in router", prompt);
	const makeRequest = async () => {
		return await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-4o",
				messages: [{ role: "user", content: prompt }],
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);
	};

	try {
		const response = await retryRequest(makeRequest);
		console.log("response.data", response.data);
		res.json(response.data);
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
});

export default router;
