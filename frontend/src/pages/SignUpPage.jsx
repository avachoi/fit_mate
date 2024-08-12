import React from "react";
import SignUp from "../components/signup";
import { Link } from "react-router-dom";

export default function SignUpPage() {
	return (
		<div className="Signup">
			<img src="today.png"></img>
			<SignUp />
			<Link to="/Login">Already have an Account</Link>
		</div>
	);
}
