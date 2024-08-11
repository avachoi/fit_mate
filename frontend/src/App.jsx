import { useState } from "react";

import "./App.css";
import WorkoutPlanGenerator from "./components/WorkoutPlanGenerator";

function App() {
	return (
		<>
			<h1>App.jsx</h1>
			<WorkoutPlanGenerator />
		</>
	);
}

export default App;

// {

//   "weight": "120",
//   "height": "5'4",
//   "fitnessLevel": "easy",
//   "preferences": [
//     "running"
//   ],
// }
