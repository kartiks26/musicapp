import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/Songs.scss";
const dotenv = require("dotenv");
// eslint-disable-next-line
const env = dotenv.config().parsed;
function Songs(props) {
	const context = useContext(AuthContext);

	const [AudioStatus, setAudioStatus] = useState(false);
	const {
		currentSong,
		setCurrentSong,
		favoriteSongs,
		addFavorite,
		Alert,
		setAlert,
		user,
	} = context;
	const data = props.data;
	let useHeader = props.useHeader;

	var audio = document.querySelectorAll("audio");
	const [controls, setControls] = useState(false);
	const favIdArray = favoriteSongs.map((song) => song._id);
	const [lastPlayed, setLastPlayed] = useState(null);
	const [PlayPause, setPlayPause] = useState(false);
	const handelDoubleClick = (e, index) => {
		switch (e.detail) {
			case 1:
				if (lastPlayed || lastPlayed === 0) {
					audio[lastPlayed].pause();
					audio[lastPlayed].currentTime = 0;
				}
				audio[index].play();
				setCurrentSong(data[index]);
				setLastPlayed(index);

				break;
			case 2:
				break;
			case 3:
				break;
			default:
				return;
		}
	};
	function muteAudio() {
		var audios = document.getElementsByTagName("audio"),
			i,
			len = audios.length;
		for (i = 0; i < len; i++) {
			audios[i].muted = true;
		}
	}

	function unMuteAudio() {
		var audios = document.getElementsByTagName("audio"),
			i,
			len = audios.length;
		for (i = 0; i < len; i++) {
			audios[i].muted = false;
		}
	}
	const handelShufflePlay = (index) => {
		setPlayPause(false);
		try {
			var audio = document.querySelectorAll("audio");
			let random = Math.floor(Math.random() * data.length);
			if (lastPlayed === null) {
				setCurrentSong(data[random]);
				setLastPlayed(random);
				audio[random].play();
			} else {
				if (!audio[lastPlayed].paused) {
					audio[lastPlayed].pause();
					audio[lastPlayed].currentTime = 0;
				}

				let random = Math.floor(Math.random() * data.length);
				while (random === lastPlayed) {
					random = Math.floor(Math.random() * data.length);
				}
				// }
				setCurrentSong(data[random]);
				audio[random].play();
				setLastPlayed(random);
			}
		} catch (error) {
			setAlert(["Error Occurred", ...Alert]);
		}
	};

	return (
		<div className="main">
			{currentSong ? (
				<div className="currentSong">
					{currentSong ? (
						<img draggable="false" src={currentSong.cover} alt="currentSong" />
					) : (
						""
					)}
					<div>
						<h1>{currentSong ? currentSong.title : ""}</h1>
						<h2>{currentSong ? currentSong.artist : ""}</h2>
					</div>
				</div>
			) : (
				""
			)}
			{useHeader ? (
				<div className="songHeaders">
					<p>Welcome {user ? user.displayName + " ," : ","}</p>
					<div className="headerControllers">
						<svg
							onClick={handelShufflePlay}
							className="ActualControllers"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-2 -3 24 24"
							width="24"
							fill="white"
						>
							<path d="M19.548 4.837L16.875 7.51a1 1 0 0 1-1.415-1.414L16.556 5H15.1a5.22 5.22 0 0 0-5.089 4.058A5.264 5.264 0 0 0 15.105 13h1.502l-1.147-1.147a1 1 0 0 1 1.415-1.414l2.828 2.828a.996.996 0 0 1 .282.562 1.006 1.006 0 0 1-.437 1.008l-2.673 2.673a1 1 0 0 1-1.415-1.414L16.556 15h-1.451a7.264 7.264 0 0 1-6.114-3.34A7.22 7.22 0 0 1 2.901 15H1a1 1 0 0 1 0-2h1.901a5.22 5.22 0 0 0 5.06-3.936A5.263 5.263 0 0 0 2.836 5H1a1 1 0 1 1 0-2h1.836a7.264 7.264 0 0 1 6.143 3.387A7.22 7.22 0 0 1 15.1 3h1.508L15.46 1.853A1 1 0 1 1 16.875.439l2.828 2.828a.996.996 0 0 1 .282.562 1.006 1.006 0 0 1-.437 1.008z"></path>
						</svg>
						<svg
							onClick={() => {
								if (AudioStatus) {
									unMuteAudio();
									setAudioStatus(false);
								} else {
									muteAudio();
									setAudioStatus(true);
								}
							}}
							className="ActualControllers"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-2 -2 24 24"
							width="24"
							fill="white"
						>
							{AudioStatus ? (
								<path d="M15.658 10.057l.707-.707a1 1 0 1 0-1.414-1.415l-.707.708-.707-.708a1 1 0 0 0-1.414 1.415l.707.707-.707.707a1 1 0 0 0 1.414 1.414l.707-.707.707.707a1 1 0 0 0 1.414-1.414l-.707-.707zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm-4.718-6.713h1.005l1.823 1.71a2 2 0 0 0 1.368.54h.204a1.6 1.6 0 0 0 1.6-1.6v-7.8a1.6 1.6 0 0 0-1.6-1.6h-.204a2 2 0 0 0-1.368.541l-1.823 1.71H5.282a2 2 0 0 0-2 2v2.5a2 2 0 0 0 2 2zm1.796-4.5L9.282 6.72v6.634l-2.204-2.067H5.282v-2.5h1.796z"></path>
							) : (
								<path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm5.658-7.943l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707-.707.707a1 1 0 0 1-1.414-1.414l.707-.707-.707-.707a1 1 0 1 1 1.414-1.415l.707.708.707-.708a1 1 0 0 1 1.414 1.415l-.707.707zm-10.376 3.23a2 2 0 0 1-2-2v-2.5a2 2 0 0 1 2-2h1.005L8.11 5.078a2 2 0 0 1 1.368-.54h.204a1.6 1.6 0 0 1 1.6 1.6v7.8a1.6 1.6 0 0 1-1.6 1.6h-.204a2 2 0 0 1-1.368-.542l-1.823-1.709H5.282zm1.796-4.5H5.282v2.5h1.796l2.204 2.067V6.72L7.078 8.787z"></path>
							)}
						</svg>

						{PlayPause ? (
							<svg
								onClick={() => {
									if (lastPlayed || lastPlayed === 0) {
										if (audio[lastPlayed].paused || lastPlayed === 0) {
											audio[lastPlayed].play();
											setPlayPause(!PlayPause);
										}
									}
								}}
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -3 24 24"
								width="28"
								fill="white"
							>
								<path d="M13.82 9.523a.976.976 0 0 0-.324-1.363L3.574 2.128a1.031 1.031 0 0 0-.535-.149c-.56 0-1.013.443-1.013.99V15.03c0 .185.053.366.153.523.296.464.92.606 1.395.317l9.922-6.031c.131-.08.243-.189.325-.317zm.746 1.997l-9.921 6.031c-1.425.867-3.3.44-4.186-.951A2.918 2.918 0 0 1 0 15.03V2.97C0 1.329 1.36 0 3.04 0c.567 0 1.123.155 1.605.448l9.921 6.032c1.425.866 1.862 2.696.975 4.088-.246.386-.58.712-.975.952z"></path>
							</svg>
						) : (
							<svg
								onClick={() => {
									if (lastPlayed || lastPlayed === 0) {
										if (!audio[lastPlayed].paused) {
											audio[lastPlayed].pause();
											setPlayPause(!PlayPause);
										}
									}
								}}
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -3 24 24"
								width="24"
								fill="white"
							>
								<path d="M2 0h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2H2zm10-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2h-2z"></path>
							</svg>
						)}
						<svg
							onClick={() => {
								if (lastPlayed || lastPlayed === 0) {
									if (!audio[lastPlayed].paused) {
										audio[lastPlayed].pause();
										audio[lastPlayed].currentTime = 0;
									}
								}

								setCurrentSong(null);
							}}
							className="ActualControllers"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							fill="white"
						>
							<path d="M4.16 4.16l1.42 1.42A6.99 6.99 0 0 0 10 18a7 7 0 0 0 4.42-12.42l1.42-1.42a9 9 0 1 1-11.69 0zM9 0h2v8H9V0z" />
						</svg>
					</div>
				</div>
			) : (
				""
			)}
			<div className="controls">
				{controls ? (
					<>
						<div
							onMouseOver={() => {
								setControls(true);
							}}
							onMouseLeave={() => {
								setControls(false);
							}}
							className="controllers"
						>
							<svg
								onClick={handelShufflePlay}
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-5 -5 24 24"
								width="24"
								fill="white"
							>
								<path d="M11.314 7.071l-4.95-4.95A1 1 0 0 1 7.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95zm-6 0l-4.95-4.95A1 1 0 1 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"></path>
							</svg>
							<svg
								onClick={() => {
									if (lastPlayed || lastPlayed === 0) {
										if (audio[lastPlayed].muted) {
											audio[lastPlayed].muted = false;
										} else {
											audio[lastPlayed].muted = true;
										}
									}
								}}
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-1 -3 24 24"
								width="24"
								fill="white"
							>
								<path d="M12 2h-.6a2 2 0 0 0-1.444.617L6.239 6.5H2v5h4.239l3.717 3.883A2 2 0 0 0 11.4 16H12V2zM5.385 4.5L8.51 1.234A4 4 0 0 1 11.401 0H13a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-1.6a4 4 0 0 1-2.889-1.234L5.385 13.5H2a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h3.385zM19.415 9l1.413 1.414a1 1 0 1 1-1.414 1.414L18 10.414l-1.414 1.414a1 1 0 1 1-1.414-1.414L16.586 9l-1.414-1.414a1 1 0 0 1 1.414-1.414L18 7.586l1.414-1.414a1 1 0 1 1 1.414 1.414L19.414 9z"></path>
							</svg>
							{PlayPause ? (
								<abbr title="Play">
									<svg
										onClick={() => {
											if (lastPlayed || lastPlayed === 0) {
												if (audio[lastPlayed].paused || lastPlayed === 0) {
													audio[lastPlayed].play();
													setPlayPause(!PlayPause);
												}
											}
										}}
										className="ActualControllers"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="-4 -3 24 24"
										width="24"
										fill="white"
									>
										<path d="M13.82 9.523a.976.976 0 0 0-.324-1.363L3.574 2.128a1.031 1.031 0 0 0-.535-.149c-.56 0-1.013.443-1.013.99V15.03c0 .185.053.366.153.523.296.464.92.606 1.395.317l9.922-6.031c.131-.08.243-.189.325-.317zm.746 1.997l-9.921 6.031c-1.425.867-3.3.44-4.186-.951A2.918 2.918 0 0 1 0 15.03V2.97C0 1.329 1.36 0 3.04 0c.567 0 1.123.155 1.605.448l9.921 6.032c1.425.866 1.862 2.696.975 4.088-.246.386-.58.712-.975.952z"></path>
									</svg>
								</abbr>
							) : (
								<abbr title="Pause">
									<svg
										onClick={() => {
											if (lastPlayed || lastPlayed === 0) {
												if (!audio[lastPlayed].paused) {
													audio[lastPlayed].pause();
													setPlayPause(!PlayPause);
												}
											}
										}}
										className="ActualControllers"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="-4 -3 24 24"
										width="24"
										fill="white"
									>
										<path d="M2 0h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2H2zm10-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2h-2z"></path>
									</svg>
								</abbr>
							)}
							<abbr title="Close Player">
								<svg
									onClick={() => {
										if (lastPlayed || lastPlayed === 0) {
											if (!audio[lastPlayed].paused) {
												audio[lastPlayed].pause();
												audio[lastPlayed].currentTime = 0;
											}
										}

										setCurrentSong(null);
									}}
									className="ActualControllers"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="-4 -4 24 24"
									width="24"
									fill="white"
								>
									<path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"></path>
								</svg>
							</abbr>
						</div>
					</>
				) : (
					<></>
				)}
				<abbr title="Controls">
					<button
						className="controlButton"
						onMouseOver={() => {
							setControls(true);
						}}
						onClick={() => {
							setControls(!controls);
						}}
					>
						<svg
							className="ActualControllers"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-5 -4.5 24 24"
							width="24"
							fill="currentColor"
						>
							<path d="M7.071 2.828l-4.95 4.95A1 1 0 0 1 .707 6.364L6.364.707a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414l-4.95-4.95zm0 6l-4.95 4.95a1 1 0 1 1-1.414-1.414l5.657-5.657a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1-1.414 1.414l-4.95-4.95z"></path>
						</svg>
					</button>
				</abbr>
			</div>
			<div className="songs">
				{data
					? data.map((item, index) => {
							return (
								<div key={index} className="container">
									<div
										onClick={(e) => {
											handelDoubleClick(e, index);
										}}
										className="song"
										key={index}
									>
										<div className="song-img">
											<img draggable="false" src={item.cover} alt="" />
										</div>
										<div className="AdjustFooter">
											<div>
												<h1>{item.title}</h1>
												<h3>{item.artist}</h3>
											</div>
											<button
												className="Liked"
												onClick={() => {
													addFavorite(item);
												}}
											>
												<img
													alt="Like"
													src={`images/${
														favIdArray.includes(item._id) ? "Liked" : "NotLiked"
													}.svg`}
												/>
											</button>
										</div>

										<div className="audioLike">
											<audio
												style={{
													display: "none",
												}}
												onPlay={() => {
													setCurrentSong(item);

													setLastPlayed(index);
												}}
												onPause={() => {
													if (!currentSong) {
														setCurrentSong(null);
													}
												}}
												onEnded={() => {
													handelShufflePlay();
												}}
												src={item.SongUrl}
												controls
												controlsList="nodownload noplaybackrate"
											></audio>
										</div>
									</div>
								</div>
							);
					  })
					: ""}
			</div>
		</div>
	);
}

export default Songs;
