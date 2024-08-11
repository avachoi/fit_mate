import { useState } from "react";
import axios from "axios";
import Login from "./components/login";

import "./App.css";
import WorkoutPlanGenerator from "./components/WorkoutPlanGenerator";

function App() {
	return (
		<>
			<h1>App.jsx</h1>
			<WorkoutPlanGenerator />
			<Login />
		</>
	);
}

export default App;
