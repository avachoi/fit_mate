import dotenv from "dotenv";
const jwtSecret = process.env.JWT_SECRET;

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	if (!token) {
		return res.status(401).send("Access denied. No token provided.");
	}

	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send("Invalid token");
	}
};
