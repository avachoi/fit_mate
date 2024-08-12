import React from "react";
import Nav from "../components/Nav";

export default function Profile() {
	let user = JSON.parse(localStorage.getItem("user"));
	return (
		<div>
			<div className="topProfile profileSection">
				<h3>My Profile!</h3>
				<img src="profile.png"></img>
				<h4>{user.name}</h4>
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
			<Nav />
		</div>
	);
}
