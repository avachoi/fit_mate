import React from "react";
import WorkoutPlanGenerator from "../components/WorkoutPlanGenerator";
import Nav from "../components/Nav";

export default function WorkoutPage() {
	return (
		<div className="WorkoutPage">
			<WorkoutPlanGenerator />
			<Nav />
		</div>
	);
}
