import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
function Alert() {
	const context = useContext(AuthContext);
	const { Alert, setAlert } = context;
	for (let i = 0; i < Alert.length; i++) {
		setTimeout(() => {
			setAlert([]);
		}, 4000);
	}
	return (
		<div
			style={{
				position: "fixed",
				zIndex: "9999",
				top: "30px",
				left: "0",
				textAlign: "center",
				color: "black",
				fontSize: "1.5rem",
				padding: "1rem",
				display: Alert.length > 0 ? "block" : "none",
			}}
			className="alert"
		>
			{Alert.map((item, index) => {
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "1rem",
							marginTop: "1rem",
							padding: "1rem",
							backgroundColor: "white",
						}}
						key={index}
					>
						{item}
					</div>
				);
			})}
		</div>
	);
}

export default Alert;
