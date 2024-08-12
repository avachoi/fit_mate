import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<div className="Nav">
			<a>
				<img src="today.png" className="navIcon"></img>
			</a>
			<Link to="/workout-plan-generator">
				<img src="plans.png" className="navIcon"></img>
			</Link>
			<Link to="/chat">
				<img src="chatbot.png" className="navIcon"></img>
			</Link>
			<Link to="/profile">
				<img src="user.png" className="navIcon"></img>
			</Link>
		</div>
	);
}
