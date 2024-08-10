import express from "express";
import { signup } from "../controllers/userController.js";
import users from "../data/users.js";
import Users from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const users = await Users.find({});
	res.json(users);
});

router.get("/:id", async (req, res) => {
	console.log("User ID: ", req.params.id);
	const user = await Users.findOne({ _id: req.params.id });
	await console.log("User: ", user);
	res.json(user);
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

router.post("/signup", signup);

// router.post("/login", login);

export default router;
