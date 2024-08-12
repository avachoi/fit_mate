import Users from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	try {
		const newUser = req.body;
		console.log("newUser", newUser);
		const existedName = await Users.findOne({ email: newUser.email });
		if (existedName) {
			res.send("Username already existed");
		} else if (newUser.name === newUser.password) {
			res.send("Username and Password can not be same.");
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newUser.password, salt);
			const createdUser = await Users.create({
				name: newUser.name,
				email: newUser.email,
				password: hashedPassword,
				fitnessLevel: newUser.fitnessLevel,
				preferences: newUser.preferences,
				goal: newUser.goal,
				weight: newUser.weight,
				height: newUser.height,
				sex: newUser.sex,
				userPlans: [],
			});
			console.log("createdUser", createdUser);
			const token = jwt.sign(
				{ userId: createdUser._id },
				process.env.JWT_SECRET,
				{
					expiresIn: "3h",
				}
			);
			res.status(201).json({ token, user: createdUser });
		}
	} catch (error) {
		console.log("Error signing up", error);
		res.status(500).send("Error signing up");
	}
};

export const getUserData = async (req, res) => {
	try {
		const userId = req.user.id; // Assuming authMiddleware sets req.user
		const user = await Users.findById(userId).select("-password"); // Exclude password from the response
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json(user);
	} catch (error) {
		console.log("Error fetching user data", error);
		res.status(500).json({ message: "Server error" });
	}
};
// exports.login = async (req, res) => {
// 	// Login logic here
// };
