import React, { useEffect, useContext, useState } from "react";
import "../css/navbar.scss";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
	const [drop, setDrop] = React.useState(false);
	const [setting, setSetting] = useState(false);
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
				{setting ? (
					<div
						onMouseOut={() => {
							setSetting(false);
						}}
						className="setting"
					></div>
				) : (
					""
				)}

				{width > 426 ? (
					<ul>
						<Link className="Link" to="/">
							<svg
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-2 -2 24 24"
								width="21"
								fill="currentColor"
							>
								<path d="M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z"></path>
							</svg>
						</Link>
						<Link className="Link" to="/Favorites">
							<img src="images/Liked.svg" alt="heart" />
						</Link>
						<svg
							className="ActualControllers"
							onClick={() => {
								setSetting(!setting);
								setNotifications(false);
							}}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-2 -2 24 24"
							width="24"
							fill="white"
						>
							<path d="M20 8.163A2.106 2.106 0 0 0 18.926 10c0 .789.433 1.476 1.074 1.837l-.717 2.406a2.105 2.105 0 0 0-2.218 3.058l-2.062 1.602A2.104 2.104 0 0 0 11.633 20l-3.29-.008a2.104 2.104 0 0 0-3.362-1.094l-2.06-1.615A2.105 2.105 0 0 0 .715 14.24L0 11.825A2.106 2.106 0 0 0 1.051 10C1.051 9.22.63 8.54 0 8.175L.715 5.76a2.105 2.105 0 0 0 2.207-3.043L4.98 1.102A2.104 2.104 0 0 0 8.342.008L11.634 0a2.104 2.104 0 0 0 3.37 1.097l2.06 1.603a2.105 2.105 0 0 0 2.218 3.058L20 8.162zM14.823 3.68c0-.063.002-.125.005-.188l-.08-.062a4.103 4.103 0 0 1-4.308-1.428l-.904.002a4.1 4.1 0 0 1-4.29 1.43l-.095.076A4.108 4.108 0 0 1 2.279 7.6a4.1 4.1 0 0 1 .772 2.399c0 .882-.28 1.715-.772 2.4a4.108 4.108 0 0 1 2.872 4.09l.096.075a4.104 4.104 0 0 1 4.289 1.43l.904.002a4.1 4.1 0 0 1 4.307-1.428l.08-.062A4.108 4.108 0 0 1 17.7 12.4a4.102 4.102 0 0 1-.773-2.4c0-.882.281-1.716.773-2.4a4.108 4.108 0 0 1-2.876-3.919zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
						</svg>
						<Link className="Link" to="/upload">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="28"
								fill="white"
							>
								<g data-name="Layer 2">
									<g data-name="cloud-upload">
										<rect width="24" height="24" opacity="0" />
										<path d="M12.71 11.29a1 1 0 0 0-1.4 0l-3 2.9a1 1 0 1 0 1.38 1.44L11 14.36V20a1 1 0 0 0 2 0v-5.59l1.29 1.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
										<path d="M17.67 7A6 6 0 0 0 6.33 7a5 5 0 0 0-3.08 8.27A1 1 0 1 0 4.75 14 3 3 0 0 1 7 9h.1a1 1 0 0 0 1-.8 4 4 0 0 1 7.84 0 1 1 0 0 0 1 .8H17a3 3 0 0 1 2.25 5 1 1 0 0 0 .09 1.42 1 1 0 0 0 .66.25 1 1 0 0 0 .75-.34A5 5 0 0 0 17.67 7z" />
									</g>
								</g>
							</svg>
						</Link>
						<section
							onClick={() => {
								setNotifications(!notifications);
								setSetting(false);
							}}
							className="notifier "
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
							<p align="center">{Alert.length > 0 ? Alert.length : 0}</p>
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
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<section
								style={{
									marginTop: "20px",
								}}
								onClick={() => {
									setNotifications(!notifications);
									setSetting(false);
								}}
								className="notifier "
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
								<p align="center">{Alert.length > 0 ? Alert.length : 0}</p>
							</section>
							{!user ? (
								<>
									<svg
										onClick={() => {
											setDrop(!drop);
										}}
										xmlns="http://www.w3.org/2000/svg"
										viewBox="-5 -7 24 24"
										width="48"
										fill="white"
									>
										<path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"></path>
									</svg>
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
						</div>
						<div
							className="Expand"
							style={{
								display: drop ? "flex" : "none",
							}}
						>
							<Link className="Link" to="/">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-2 -2 24 24"
									width="24"
									fill="currentColor"
								>
									<path d="M18 18V7.132l-8-4.8-8 4.8V18h4v-2.75a4 4 0 1 1 8 0V18h4zm-6 2v-4.75a2 2 0 1 0-4 0V20H2a2 2 0 0 1-2-2V7.132a2 2 0 0 1 .971-1.715l8-4.8a2 2 0 0 1 2.058 0l8 4.8A2 2 0 0 1 20 7.132V18a2 2 0 0 1-2 2h-6z"></path>
								</svg>
							</Link>
							<Link className="Link" to="/Favorites">
								<img src="images/Liked.svg" alt="heart" />
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
					<h2 align="start">Notifications</h2>
					{Alert.map((item, index) => {
						return (
							<div className="alerts" key={index}>
								<h3 align="center">{item}</h3>
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
