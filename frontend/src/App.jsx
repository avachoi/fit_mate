import { useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import WorkoutPage from "./pages/WorkoutPage";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<WelcomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/workout-plan-generator" element={<WorkoutPage />} />
			</Routes>
		</div>
	);
}

export default App;
