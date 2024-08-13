import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../utils/authMiddleware.js";
import { signup, getUserData } from "../controllers/userController.js";
import Users from "../models/User.js";
import dotenv from "dotenv";

const router = express.Router();
router.get("/me", authMiddleware, getUserData);

const jwtSecret = process.env.JWT_SECRET;

//routes for "/api/users"

// router.get("/", async (req, res) => {
// 	const users = await Users.find({});
// 	res.json(users);
// });

router.get("/:id", async (req, res) => {
	console.log("User ID: ", req.params.id);
	const user = await Users.findOne({ _id: req.params.id });
	await console.log("User: ", user);
	res.json(user);
});

router.put("/:id", async (req, res) => {
	try {
		console.log("User ID in update route: ", req.params.id);
		const { email, password, fitnessLevel, preferences, goal, weight } =
			req.body;
		const user = await Users.findOne({ _id: req.params.id });

		user.email = email;
		user.password = password;
		user.fitnessLevel = fitnessLevel;
		user.preferences = preferences;
		user.goal = goal;
		user.weight = weight;

		const updatedUser = await user.save();

		// const newUserInfo = await Users.updateOne(
		// 	{ _id: req.params.id },
		// 	{
		// 		...user,
		// 		email: email,
		// 		password: password,
		// 		fitnessLevel: fitnessLevel,
		// 		preferences: preferences,
		// 		goal: goal,
		// 		weight: weight,
		// 	},
		// 	{ new: true }
		// );
		console.log("User updated:", user);
		res.json(updatedUser);
	} catch (error) {
		console.log("Error updating user", error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const user = await Users.findOneAndDelete({ _id: req.params.id });
		if (user) {
			res.json({ message: "User removed" });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.log("Error deleting user", error);
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await Users.findOne({ email });
		if (user) {
			console.log("Plain text password:", password);
			console.log("Hashed password from DB:", user.password);
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const token = jwt.sign({ userId: user._id }, jwtSecret, {
					expiresIn: "3h",
				});
				res.status(200).json({ token, user });
			} else {
				res.status(400).send("Password doesn't match");
			}
		} else {
			return res.status(400).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.log("Error retrieving users:", error);
		res.status(500).send("Error logging In");
	}
});

router.get("/logout", async (req, res) => {
	res.send("Logged out");
});

router.post("/signup", signup);

// router.post("/login", login);

export default router;
