import React, { useEffect, useContext, useState } from "react";
import "../css/navbar.scss";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
	const [drop, setDrop] = React.useState(false);
	const [width, setWidth] = React.useState(window.outerWidth);
	const context = useContext(AuthContext);
	const { user, setUser } = context;
	const location = useLocation();
	const [locationPath, setLocationPath] = useState(location.pathname);
	useEffect(() => {
		setLocationPath(location.pathname);
		console.log(locationPath);
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	}, [window.innerWidth, location.pathname]);
	useEffect(() => {
		const initialUser = localStorage.getItem("MusicUser");
		if (initialUser) {
			setUser(JSON.parse(initialUser));
		}
	}, []);
	return (
		<div className="navbar">
			<Link className="Logo" to="/">
				Music
			</Link>
			{width > 426 ? (
				<ul>
					<Link className="Link" to="/">
						Home
					</Link>
					<Link className="Link" to="/Favorites">
						Favorites
					</Link>
					<Link className="Link" to="/upload">
						<img src="/images/upload.svg" />
					</Link>
					{user ? (
						<Link to="/login">
							<img src={user.photoURL} />
						</Link>
					) : (
						<Link className="Link" to="/login">
							Login
						</Link>
					)}
				</ul>
			) : (
				<div className="mobileView">
					{!user ? (
						<button
							onClick={() => {
								setDrop(!drop);
							}}
						>
							Menu
						</button>
					) : (
						<img
							onClick={() => {
								setDrop(!drop);
							}}
							src={user.photoURL}
						/>
					)}
					<div
						className="Expand"
						style={{
							display: drop ? "flex" : "none",
						}}
					>
						<Link className="Link" to="/">
							Home
						</Link>
						<Link className="Link" to="/Favorites">
							Favorites
						</Link>
						<Link className="Link" to="/upload">
							<img src="/images/upload.svg" />
						</Link>
						<Link className="Link" to="/login">
							Login
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navbar;
