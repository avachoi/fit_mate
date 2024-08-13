import React from "react";
import Login from "../components/Login.jsx";
import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<div className="Login">
			<Login />
			<a className="forget">Forgot Your Password?</a>
			<Link to="/Signup">Dont Have an Account?</Link>
		</div>
	);
}
