import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/upload.scss";
function Upload() {
	const [length, setLength] = useState(window.innerWidth);
	useEffect(() => {
		window.addEventListener("resize", () => {
			setLength(window.innerWidth);
		});
	}, []);

	const [newUser, setNewUser] = useState({
		title: "",
		artist: "",
		cover: "",
		song: "",
	});
	const [UploadImage, setUploadImage] = useState(null);
	const [UploadSong, setUploadSong] = useState(null);
	const [data, setData] = useState([]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("files", newUser.cover);
		formData.append("files", newUser.song);
		formData.append("artist", newUser.artist);
		formData.append("title", newUser.title);
		// "";
		//
		axios

			.post("http://localhost:4000/upload/addSong", formData)
			.then((res) => {
				setData(res.data);
				console.log(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
	};

	const handlePhoto = (e) => {
		setNewUser({ ...newUser, cover: e.target.files[0] });
		setUploadImage(URL.createObjectURL(e.target.files[0]));
	};
	const handelSong = (e) => {
		setNewUser({ ...newUser, song: e.target.files[0] });

		setUploadSong(e.target.files[0]);
		console.log(e.target.files[0]);
	};

	return (
		<div className="InputForm">
			<div id={length < 426 ? "makeWidthBigger" : ""} className="banner">
				<img src="images/UploadBanner.svg" />
			</div>
			<div className="UploadForm">
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<div className="files">
						<div className="divFileUpload">
							<label htmlFor="image">
								<img
									src={`${
										UploadImage ? UploadImage : "/images/UploadImage.svg"
									}`}
								/>

								{UploadImage ? <p>Change Image</p> : <p>Upload Image</p>}
							</label>

							<input
								type="file"
								accept=".png, .jpg, .jpeg"
								name="cover"
								required
								onChange={handlePhoto}
								id="image"
								className="fileUpload"
							></input>
						</div>

						<div className="divFileUpload">
							<label htmlFor="song">
								{UploadSong ? (
									<p>{UploadSong.name}</p>
								) : (
									<>
										<img src="/images/UploadSong.svg" />
									</>
								)}
								{UploadSong ? (
									<p id="uploadSongP">Change Song</p>
								) : (
									<p>Upload Song </p>
								)}
							</label>
							<input
								id="song"
								type="file"
								accept=".mp3"
								name="song"
								required
								onChange={handelSong}
							/>
						</div>
					</div>
					<div className="OtherInputs">
						<input
							type="text"
							placeholder="Title"
							name="title"
							required
							value={newUser.tile}
							onChange={handleChange}
						/>
						<input
							type="text"
							placeholder="Artist"
							name="artist"
							required
							autoComplete="off"
							value={newUser.artist}
							onChange={handleChange}
						/>

						<input id="submit" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Upload;
