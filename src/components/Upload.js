import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/upload.scss";
import { uploadImages, uploadSongs } from "../db/firebase";
import AuthContext from "../context/AuthContext";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
function Upload() {
	const [length, setLength] = useState(window.innerWidth);
	useEffect(() => {
		window.addEventListener("resize", () => {
			setLength(window.innerWidth);
		});
	}, []);

	const [UploadImage, setUploadImage] = useState(null);
	const [UploadSong, setUploadSong] = useState(null);

	const context = useContext(AuthContext);
	const { uploadedImage, setUploadedImage, uploadedSong, setUploadedSong } =
		context;

	const [newUser, setNewUser] = useState({
		title: "",
		artist: "",
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		var data = {
			artist: newUser.artist,
			title: newUser.title,
			songUrl: uploadedSong,
			coverUrl: uploadedImage,
		};

		axios

			.post(
				"https://incandescent-act-production.up.railway.app/upload/addSongWithFirebase",
				data
			)
			.then((res) => {
				console.log(res);
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

		// Uploading File to Firebase Directly
		const metadata = {
			contentType: "image/jpeg",
		};
		const storage = getStorage();
		const storageRef = ref(storage, "images/" + e.target.files[0].name);
		const uploadTask = uploadBytesResumable(
			storageRef,
			e.target.files[0],
			metadata
		);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						break;
					case "storage/canceled":
						// User canceled the upload
						break;

					// ...

					case "storage/unknown":
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					setUploadedImage(downloadURL);
				});
			}
		);
	};
	const handelSong = (e) => {
		setNewUser({ ...newUser, song: e.target.files[0] });

		setUploadSong(e.target.files[0]);
		console.log(e.target.files[0]);
		const storage = getStorage();
		// Uploading File to Firebase Directly

		const metadata = {
			contentType: "audio/mpeg",
		};
		const storageRef = ref(storage, "songs/" + e.target.files[0].name);
		const uploadTask = uploadBytesResumable(
			storageRef,
			e.target.files[0],
			metadata
		);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						break;
					case "storage/canceled":
						// User canceled the upload
						break;

					// ...

					case "storage/unknown":
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					setUploadedSong(downloadURL);
				});
			}
		);
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

						<input
							id="submit"
							type="submit"
							disabled={
								uploadedImage !== null && uploadedSong !== null ? false : true
							}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Upload;