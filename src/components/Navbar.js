import React, { useEffect, useContext } from "react";
import "../css/navbar.scss";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
	const [drop, setDrop] = React.useState(false);
	const [width, setWidth] = React.useState(window.outerWidth);
	const context = useContext(AuthContext);
	const { user } = context;
	useEffect(() => {
		setWidth(window.outerWidth);
	}, [window.outerWidth]);
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
					<Link className="Link" to="/upload">
						upload
					</Link>
					{user ? (
						<img src={user.photoURL} />
					) : (
						<Link className="Link" to="/login">
							Login
						</Link>
					)}
				</ul>
			) : (
				<div className="mobileView">
					<button
						onClick={() => {
							setDrop(!drop);
						}}
					>
						Menu
					</button>
					<div
						className="Expand"
						style={{
							display: drop ? "flex" : "none",
						}}
					>
						<Link className="Link" to="/">
							Home
						</Link>
						<Link className="Link" to="/upload">
							upload
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
