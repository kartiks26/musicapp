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
	} = context;
	const data = props.data;
	const favIdArray = favoriteSongs.map((song) => song._id);
	return (
		<div className="main">
			{currentSong ? (
				<div className="currentSong">
					{currentSong ? <img src={currentSong.cover} alt="currentSong" /> : ""}
					<div>
						<h1>{currentSong ? currentSong.title : ""}</h1>
						<h2>{currentSong ? currentSong.artist : ""}</h2>
					</div>
					<i class="fa-solid fa-xmark"></i>
				</div>
			) : (
				""
			)}
			<h1
				style={{
					color: "white",
					marginTop: "80px",
				}}
			>
				Listen To Songs
			</h1>
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
										<audio
											onPlay={() => {
												setCurrentSong(item);
											}}
											onPause={() => {
												if (!currentSong) {
													setCurrentSong(null);
												}
											}}
											src={item.SongUrl}
											controls
											controlsList="nodownload noplaybackrate"
										></audio>
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
