import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import AuthState from "./context/AuthState";

ReactDOM.render(
	<React.StrictMode>
		<AuthState>
			<App />
		</AuthState>
	</React.StrictMode>,
	document.getElementById("root")
);
Notification.requestPermission(function (status) {
	console.log("Notification permission status:", status);
});
window.addEventListener("offline", function (e) {
	console.log("beforeinstallprompt Event fired");
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
