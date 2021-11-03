import AuthContext from "./AuthContext";
import React, { useEffect, useState } from "react";
const AuthState = (props) => {
	const [user, setUser] = useState(null);
	const [currentSong, setCurrentSong] = useState(null);

	const login = (user) => {
		setUser(user);
		localStorage.setItem("MusicUser", JSON.stringify(user));
		console.log("user Saved", user);
		// store user in cookies
	};

	return (
		<AuthContext.Provider
			value={{ user, setUser, setCurrentSong, currentSong, login }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthState;
