import Users from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	try {
		const newUser = req.body;
		const existedName = await Users.findOne({ name: newUser.name });
		if (existedName) {
			res.send("username already existed");
		} else {
			const createdUser = await Users.create({
				name: newUser.name,
				email: newUser.email,
				password: newUser.password,
				fitnessLevel: newUser.fitnessLevel,
				preferences: newUser.preferences,
				goal: newUser.goal,
				weight: newUser.weight,
				height: newUser.height,
				sex: newUser.sex,
				userPlans: newUser.userPlans,
			});
			console.log("CreatedUser", createdUser);
		}
	} catch (error) {
		console.log("Error signing up", error);
		res.status(500).send("Error signing up");
	}
};

// exports.login = async (req, res) => {
// 	// Login logic here
// };
