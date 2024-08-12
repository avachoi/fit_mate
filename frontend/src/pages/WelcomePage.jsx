import React from "react";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { Link } from "react-router-dom";

export default function WelcomePage() {
	return (
		<div className="Welcome">
			<img src="today.png"></img>
			<Link to="/login">
				<button>Log In</button>
			</Link>
			<Link to="/signup">
				<button>Sign Up</button>
			</Link>
		</div>
	);
}
