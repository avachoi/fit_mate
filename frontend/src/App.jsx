import { useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import WorkoutPage from "./pages/WorkoutPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import Nav from "./components/Nav";
import "./App.css";

function App() {
	// const isNotLogin = sssd;
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<WelcomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/workout-plan-generator" element={<WorkoutPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/chat" element={<ChatPage />} />
			</Routes>

			{/* {( && <Nav />)} */}
		</div>
	);
}

export default App;
