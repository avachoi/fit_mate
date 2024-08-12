import React from "react";
import Login from "../components/login";
import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<div className="Login">
			<img src="today.png"></img>
			<Login />
			<a>Forgot Your Password?</a>
			<Link to="/Signup">Don't Have an Account?</Link>
		</div>
	);
}
