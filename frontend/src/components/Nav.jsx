import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<div className="Nav">
			<a className="navItem">
				<img src="today.png" className="navIcon"></img>
				<small>Today</small>
			</a>
			<Link to="/workout-plan-generator" className="navItem">
				<img src="plans.png" className="navIcon"></img>
				<small>Plans</small>
			</Link>
			<Link to="/chat" className="navItem">
				<img src="chatbot.png" className="navIcon"></img>
				<small>Chat</small>
			</Link>
			<Link to="/profile" className="navItem">
				<img src="user.png" className="navIcon"></img>
				<small>Profile</small>
			</Link>
		</div>
	);
}
