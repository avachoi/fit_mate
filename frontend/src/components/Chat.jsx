import React from "react";

export default function Chat() {
	return (
		<div className="chat">
			<h3>Review and talk</h3>
			<form>
				<input
					type="text"
					placeholder="Service is not ready."
					className="chatInput"
				></input>
				<button>Send</button>
			</form>
		</div>
	);
}
