import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Songs from "./Songs";
function Favorites() {
	const context = useContext(AuthContext);
	const { favoriteSongs } = context;
	return (
		<div>
			<Songs data={favoriteSongs} useHeader={true} />
		</div>
	);
}

export default Favorites;
