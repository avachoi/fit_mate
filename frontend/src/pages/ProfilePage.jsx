import React from "react";
import Nav from "../components/Nav.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
	let [user, setUser] = React.useState(
		JSON.parse(localStorage.getItem("user"))
	);
	let [profileState, setProfileState] = React.useState("render");
	let [email, setEmail] = React.useState(user.email);
	let [password, setPassword] = React.useState(user.password);
	let [fitnessLevel, setFitnessLevel] = React.useState(user.fitnessLevel);
	let [preferences, setPreferences] = React.useState(user.preferences);
	let [goal, setGoal] = React.useState(user.goal);
	let [weight, setWeight] = React.useState(user.weight);
	let [error, setError] = React.useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("will update user");
			const updateData = {
				email,
				password,
				fitnessLevel,
				preferences,
				goal,
				weight,
			};
			const response = await axios.put(
				// `http://localhost:5173/api/users/${user._id}`,
				`https://fit-mate.onrender.com/api/users/${user._id}`,
				updateData
			);
			setUser(response.data);
			setProfileState("render");
		} catch (err) {
			console.log("Invalid input");
			console.error("Error signing up", err);
		}
	};
	const profileForm = () => (
		<div className="profileForm">
			<h3>Update Your Info</h3>
			<form onSubmit={handleSubmit}>
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
				<div>
					<input
						type="text"
						id="fitnessLevel"
						name="fitnessLevel"
						value={fitnessLevel}
						onChange={(e) => setFitnessLevel(e.target.value)}
						required
						placeholder="fitnessLevel"
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
				</div>

				{error && <p style={{ color: "red" }}>{error}</p>}
				<button type="submit" className="saveBtw">
					Save
				</button>
			</form>
		</div>
	);

	const profileRender = () => (
		<div className="profileRender">
			<div className="topProfile">
				<h3 className="profileHeader">MY PROFILE</h3>
				<img src="camera.png" className="camera"></img>
				<h4 className="profileName">{user.name}</h4>
				<h5 onClick={() => setProfileState("form")} className="editBtw">
					edit
				</h5>
			</div>

			<div className="middleProfile profileSection">
				<div className="profile_row">
					<p>Weight</p>
					<p>{user.weight}</p>
				</div>

				<div className="profile_row">
					<p>Height</p>
					<p>{user.height}</p>
				</div>
				<div className="profile_row">
					<p>Fitness Level</p>
					<p>{user.fitnessLevel}</p>
				</div>
				<div className="profile_row">
					<p>Goal</p>
					<p>{user.goal}</p>
				</div>
				<div className="profile_row"></div>
			</div>
			<div className="bottomProfile profileSection">
				<div className="profile_row">
					<p>Email</p>
					<p>{user.email}</p>
				</div>
				<div className="profile_row">
					<p>Password</p>
					<p>****</p>
				</div>
			</div>
			<Link to="/">
				<h4
					id="logoutBtw"
					onClick={() => {
						localStorage.removeItem("authToken");
					}}
				>
					LOG OUT
				</h4>
			</Link>
		</div>
	);
	return (
		<div className="profileContainer">
			{profileState === "render" ? profileRender() : profileForm()}

			<Nav />
		</div>
	);
}
