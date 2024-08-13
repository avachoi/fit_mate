import React from "react";
import WorkoutPlanGenerator from "../components/WorkoutPlanGenerator.jsx";
import Nav from "../components/Nav.jsx";

export default function WorkoutPage() {
	return (
		<div className="WorkoutPage">
			<WorkoutPlanGenerator />
			<Nav />
		</div>
	);
}
