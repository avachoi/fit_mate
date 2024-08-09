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
	const user = await Users.findOne({ user_id: req.params.id });
	res.json(user);
});

router.post("/signup", signup);

// router.post("/login", login);

export default router;
