import AuthContext from "./AuthContext";
import React, { useEffect, useState } from "react";
const AuthState = (props) => {
	const [user, setUser] = useState(null);
	const [currentSong, setCurrentSong] = useState(null);

	return (
		<AuthContext.Provider
			value={{ user, setUser, setCurrentSong, currentSong }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthState;
