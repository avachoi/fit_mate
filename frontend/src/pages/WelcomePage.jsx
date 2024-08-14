import React from "react";

import { Link } from "react-router-dom";

export default function WelcomePage() {
	return (
		<div className="Welcome">
			<div className="welcomeBtws">
				<Link to="/login">
					<button>Log In</button>
				</Link>
				<Link to="/signup">
					<button className="signupLink">Sign Up</button>
				</Link>
			</div>
		</div>
	);
}
