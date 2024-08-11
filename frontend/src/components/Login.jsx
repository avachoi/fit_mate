import React, { useState } from "react";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5173/api/users/login",
				{
					email,
					password,
				}
			);
			// Assuming the response contains a token and user data
			const { token, user } = await response.data;
			// Store the token in localStorage or any state management library
			localStorage.setItem("token", token);
			// Redirect or update the UI as needed
			console.log("Login successful", user);
		} catch (err) {
			setError("Invalid email or password");
			console.error("Error logging in", err);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
