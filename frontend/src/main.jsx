import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// This connects React to the 'root' div in .html
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
