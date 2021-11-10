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
				<button onClick={handelShufflePlay}>shuffle</button>
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
