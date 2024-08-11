import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();
const openai = new OpenAI();

router.post("/generate", async (req, res) => {
	const { prompt } = req.body;
	console.log("prompt in router", prompt);

	try {
		const completion = await openai.chat.completions.create({
			messages: [{ role: "system", content: prompt }],
			model: "gpt-4o-mini",
		});

		console.log(completion.choices[0]);

		res.json(completion.choices[0]);
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
