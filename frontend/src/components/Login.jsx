import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				// "http://localhost:5173/api/users/login",
				"https://fit-mate.onrender.com/api/users/login",
				{
					email,
					password,
				}
			);
			// Assuming the response contains a token and user data
			const { token, user } = await response.data;
			// Store the token in localStorage or any state management library

			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			navigate("/workout-plan-generator");
			console.log("Login successful", user);
			console.log("token", token);
		} catch (err) {
			setError("Invalid email or password");
			console.error("Error logging in", err);
		}
	};

	return (
		<div className="login">
			<form onSubmit={handleSubmit} className="loginForm">
				<div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</div>
				<div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</div>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
