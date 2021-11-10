import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import AuthContext from "../context/AuthContext";

import "../css/Songs.scss";

const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const url = "http://localhost:4000";
function Songs(props) {
	const context = useContext(AuthContext);
	const {
		currentSong,
		setCurrentSong,
		favoriteSongs,
		setFavoriteSongs,
		addFavorite,
		ShuffleSongs,
		setShuffleSongs,
		Alert,
		setAlert,
	} = context;
	const data = props.data;
	const audio = document.querySelectorAll("audio");
	const [controls, setControls] = useState(false);
	const [playingSong, setPlayingSong] = useState("");
	const favIdArray = favoriteSongs.map((song) => song._id);
	let index = 0;
	const [lastPlayed, setLastPlayed] = useState(null);
	const handelShufflePlay = () => {
		try {
			if (lastPlayed === null) {
				let random = Math.floor(Math.random() * data.length);
				setCurrentSong(data[random]);
				audio[random].play();
				setLastPlayed(random);
			} else {
				if (!audio[lastPlayed].paused) {
					audio[lastPlayed].pause();
					audio[lastPlayed].currentTime = 0;
				}

				let random = Math.floor(Math.random() * data.length);
				while (random === lastPlayed) {
					random = Math.floor(Math.random() * data.length);
				}

				setCurrentSong(data[random]);
				audio[random].play();
				setLastPlayed(random);
			}
		} catch (error) {
			console.log(error);
			setAlert(["Error Occurred", ...Alert]);
		}
	};

	return (
		<div className="main">
			{currentSong ? (
				<div className="currentSong">
					{currentSong ? <img src={currentSong.cover} alt="currentSong" /> : ""}
					<div>
						<h1>{currentSong ? currentSong.title : ""}</h1>
						<h2>{currentSong ? currentSong.artist : ""}</h2>
						{/* audio progress */}
					</div>
					<i class="fa-solid fa-xmark"></i>
				</div>
			) : (
				""
			)}
			<div className="songControls">
				<h1
					style={{
						color: "white",
					}}
				>
					Listen To Songs
				</h1>
				<button onClick={handelShufflePlay}>
					<svg
						className="ActualControllers"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="-2 -3 24 24"
						width="24"
						fill="white"
					>
						<path d="M19.548 4.837L16.875 7.51a1 1 0 0 1-1.415-1.414L16.556 5H15.1a5.22 5.22 0 0 0-5.089 4.058A5.264 5.264 0 0 0 15.105 13h1.502l-1.147-1.147a1 1 0 0 1 1.415-1.414l2.828 2.828a.996.996 0 0 1 .282.562 1.006 1.006 0 0 1-.437 1.008l-2.673 2.673a1 1 0 0 1-1.415-1.414L16.556 15h-1.451a7.264 7.264 0 0 1-6.114-3.34A7.22 7.22 0 0 1 2.901 15H1a1 1 0 0 1 0-2h1.901a5.22 5.22 0 0 0 5.06-3.936A5.263 5.263 0 0 0 2.836 5H1a1 1 0 1 1 0-2h1.836a7.264 7.264 0 0 1 6.143 3.387A7.22 7.22 0 0 1 15.1 3h1.508L15.46 1.853A1 1 0 1 1 16.875.439l2.828 2.828a.996.996 0 0 1 .282.562 1.006 1.006 0 0 1-.437 1.008z"></path>
					</svg>
				</button>
			</div>
			<div className="controls">
				{controls ? (
					<>
						<div className="controllers">
							<svg
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -3 24 24"
								width="24"
								fill="white"
							>
								<path d="M13.82 9.523a.976.976 0 0 0-.324-1.363L3.574 2.128a1.031 1.031 0 0 0-.535-.149c-.56 0-1.013.443-1.013.99V15.03c0 .185.053.366.153.523.296.464.92.606 1.395.317l9.922-6.031c.131-.08.243-.189.325-.317zm.746 1.997l-9.921 6.031c-1.425.867-3.3.44-4.186-.951A2.918 2.918 0 0 1 0 15.03V2.97C0 1.329 1.36 0 3.04 0c.567 0 1.123.155 1.605.448l9.921 6.032c1.425.866 1.862 2.696.975 4.088-.246.386-.58.712-.975.952z"></path>
							</svg>
							<svg
								className="ActualControllers"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -3 24 24"
								width="24"
								fill="white"
							>
								<path d="M2 0h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2H2zm10-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v14h2V2h-2z"></path>
							</svg>
						</div>
					</>
				) : (
					<></>
				)}
				<button
					className="controlButton"
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
			</div>
			<div className="songs">
				{data
					? data.map((item, index) => {
							return (
								<div className="container">
									<div className="song" key={index}>
										<div className="song-img">
											<img draggable="false" src={item.cover} alt="" />
										</div>
										<div>
											<h1>{item.title}</h1>
											<h3>{item.artist}</h3>
										</div>

										<div className="audioLike">
											<audio
												onPlay={() => {
													setCurrentSong(item);
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
											<button
												onClick={() => {
													addFavorite(item);
												}}
											>
												<img
													src={`images/${
														favIdArray.includes(item._id) ? "Liked" : "NotLiked"
													}.svg`}
												/>
											</button>
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
