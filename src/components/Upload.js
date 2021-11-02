import React, { useState } from "react";
import axios from "axios";
import "../css/upload.scss";
function Upload() {
	const [newUser, setNewUser] = useState({
		title: "",
		artist: "",
		cover: "",
		song: "",
	});
	const [data, setData] = useState([]);
	const [objectUrl, setObjectUrl] = useState("undefined");
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
		// setObjectUrl(URL.createObjectURL(e.target.files[0]));
	};
	const handelSong = (e) => {
		setNewUser({ ...newUser, song: e.target.files[0] });
		// setObjectUrl(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<div className="InputForm">
			<h1>Upload your song</h1>

			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<div className="files">
					<div className="divFileUpload">
						{/* <img src="/images/UploadImage.svg" /> */}
						<input
							type="file"
							accept=".png, .jpg, .jpeg"
							name="cover"
							onChange={handlePhoto}
							id="image"
							className="fileUpload"
						/>
					</div>
					<div>
						<input
							type="file"
							accept=".mp3"
							name="song"
							onChange={handelSong}
						/>
					</div>
				</div>
				<input
					type="text"
					placeholder="Title"
					name="title"
					value={newUser.tile}
					onChange={handleChange}
				/>

				<input
					type="text"
					name="artist"
					placeholder="Artist"
					value={newUser.artist}
					autoComplete="false"
					onChange={handleChange}
				/>

				<input type="submit" />
			</form>
		</div>
	);
}

export default Upload;
