import React from "react";
import SignUp from "../components/SignUp.jsx";
import { Link } from "react-router-dom";

export default function SignUpPage() {
	return (
		<div className="Signup">
			<SignUp />
			<Link to="/Login">Already have an Account</Link>
		</div>
	);
}
