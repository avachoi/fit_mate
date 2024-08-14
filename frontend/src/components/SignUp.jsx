import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [fitnessLevel, setFitnessLevel] = React.useState("");
	const [preferences, setPreferences] = React.useState([]);
	const [goal, setGoal] = React.useState("");
	const [weight, setWeight] = React.useState(0);
	const [height, setHeight] = React.useState(0);
	const [sex, setSex] = React.useState("");

	const [signupPage, setSignupPage] = React.useState(true);
	const [signupBtw, setSignupBtw] = React.useState(false);
	const [getStartedBtw, setGetStartedBtw] = React.useState(false);

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				// "http://localhost:5173/api/users/signup",
				"https://fit-mate.onrender.com/api/users/signup",
				{
					name,
					email,
					password,
					fitnessLevel,
					preferences,
					goal,
					weight,
					height,
					sex,
					userPlans: [],
				}
			);
			// Assuming the response contains a token and user data
			const { token, user } = await response.data;
			// Store the token in localStorage or any state management library
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/workout-plan-generator");
			console.log("Sign up successful", user);
		} catch (err) {
			setError("Invalid input");
			console.error("Error signing up", err);
		}
	};
	return (
		<div>
			{signupPage ? (
				<div className="signup1">
					<form
						onSubmit={() => {
							setSignupBtw(true);
							setSignupPage(false);
						}}
					>
						<div>
							<input
								type="text"
								id="name"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								placeholder="Name"
							/>
						</div>
						<div>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Email"
							/>
						</div>
						<div>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Password"
							/>
						</div>
						{error && <p style={{ color: "red" }}>{error}</p>}
						<button type="submit">Sign Up</button>
					</form>
				</div>
			) : signupBtw ? (
				<div className="signup2">
					<img src="coach.png" className="img1"></img>
					<h3 className="saying1">
						I will ask you some questions to design a personalized plan.
					</h3>
					<button
						className="getStarted"
						onClick={() => {
							setGetStartedBtw(true);
							setSignupBtw(false);
						}}
					>
						Get Started
					</button>
				</div>
			) : (
				<div className="signup3">
					<h2 className="saying1">Answer These Questions</h2>
					<form onSubmit={handleSubmit} className="signupForm2">
						<div>
							<input
								type="text"
								id="fitnessLevel"
								name="fitnessLevel"
								value={fitnessLevel}
								onChange={(e) => setFitnessLevel(e.target.value)}
								required
								placeholder="fitness Levele"
							/>
						</div>
						<div>
							<input
								type="text"
								id="preferences"
								name="preferences"
								value={preferences}
								onChange={(e) => setPreferences(e.target.value)}
								required
								placeholder="preferences"
							/>
						</div>
						<div>
							<input
								type="text"
								id="goal"
								name="goal"
								value={goal}
								onChange={(e) => setGoal(e.target.value)}
								required
								placeholder="goal"
							/>
						</div>
						<div>
							<input
								type="number"
								id="weight"
								name="weight"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								required
								placeholder="weight"
							/>
							<div>
								<input
									type="number"
									id="height"
									name="height"
									value={height}
									onChange={(e) => setHeight(e.target.value)}
									required
									placeholder="height"
								/>
							</div>
							<div>
								<input
									type="text"
									id="sex"
									name="sex"
									value={sex}
									onChange={(e) => setSex(e.target.value)}
									required
									placeholder="sex"
								/>
							</div>
						</div>
						{error && <p style={{ color: "red" }}>{error}</p>}
						<button type="submit">Save</button>
					</form>
				</div>
			)}
		</div>
	);
}
