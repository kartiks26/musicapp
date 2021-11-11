import React, { useEffect, useContext, useState } from "react";
import "../css/navbar.scss";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
	const [drop, setDrop] = React.useState(false);
	const [width, setWidth] = React.useState(window.outerWidth);
	const context = useContext(AuthContext);
	const { user, setUser, Alert } = context;
	const [notifications, setNotifications] = useState(false);
	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

	useEffect(() => {
		const initialUser = localStorage.getItem("MusicUser");
		if (initialUser) {
			setUser(JSON.parse(initialUser));
		}
		// eslint-disable-next-line
	}, []);
	return (
		<>
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
							<svg
								// Upload
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-5 -5 24 24"
								width="28"
								fill="white"
							>
								<path d="M8 3.414v5.642a1 1 0 1 1-2 0V3.414L4.879 4.536A1 1 0 0 1 3.464 3.12L6.293.293a1 1 0 0 1 1.414 0l2.829 2.828A1 1 0 1 1 9.12 4.536L8 3.414zM1 12h12a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z"></path>
							</svg>
						</Link>
						<section
							onClick={() => setNotifications(!notifications)}
							className="notifier Link"
						>
							<svg
								// Notifications

								onClick={() => setNotifications(!notifications)}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-3 -2 24 24"
								width="26"
								fill="white"
							>
								<path d="M18 17H0a8.978 8.978 0 0 1 3-6.708V6a6 6 0 1 1 12 0v4.292A8.978 8.978 0 0 1 18 17zM6.17 18h5.66a3.001 3.001 0 0 1-5.66 0z"></path>
							</svg>
							<p>{Alert.length > 0 ? Alert.length : 0}</p>
						</section>
						{user ? (
							<Link to="/login">
								<img alt="User" src={user.photoURL} />
							</Link>
						) : (
							<Link className="Link" to="/login">
								<svg
									className="UserNotLoggedIn"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-5 -2 24 24"
									width="18"
									fill="white"
								>
									<path d="M3.534 10.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 15.26V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 15.353V17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 0a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V4a2 2 0 0 0-2-2z"></path>
								</svg>
							</Link>
						)}
					</ul>
				) : (
					<div className="mobileView">
						{!user ? (
							<>
								<svg
									onClick={() => setNotifications(!notifications)}
									className="hamburger"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-3 -2 24 24"
									width="24"
									fill="white"
								>
									<path
										d="M18 17H0a8.978 8.978 0 0 1 3-6.708V6
							a6 6 0 1 1 12 0v4.292A8.978 8.978 0 0 1 18 17zM6.17 18h5.66a3.001 3.001 0 0 1-5.66 0z"
									></path>
								</svg>
								<button
									onClick={() => {
										setDrop(!drop);
									}}
								>
									Menu
								</button>
							</>
						) : (
							<img
								alt="User"
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
								<img alt="upload" src="/images/upload.svg" />
							</Link>
							<Link className="Link" to="/login">
								Login
							</Link>
						</div>
					</div>
				)}
			</div>
			{notifications ? (
				<div
					onMouseOver={() => {
						setNotifications(true);
					}}
					onMouseLeave={() => {
						setNotifications(false);
					}}
					className="notification"
				>
					{Alert.map((item, index) => {
						return (
							<div className="alerts" key={index}>
								<h3>{item}</h3>
							</div>
						);
					})}
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default Navbar;
