import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/upload.scss";
import AuthContext from "../context/AuthContext";
import { getDatabase, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { Link } from "react-router-dom";
function Upload() {
	const [length, setLength] = useState(window.innerWidth);
	useEffect(() => {
		window.addEventListener("resize", () => {
			setLength(window.innerWidth);
		});
	}, []);

	const [UploadImage, setUploadImage] = useState(null);
	const [UploadSong, setUploadSong] = useState(null);
	const [imageProgress, setImageProgress] = useState(0);
	const [songProgress, setSongProgress] = useState(0);

	const context = useContext(AuthContext);
	const {
		uploadedImage,
		setUploadedImage,
		uploadedSong,
		setUploadedSong,
		Alert,
		setAlert,
		user,
	} = context;

	const [newUser, setNewUser] = useState({
		title: "",
		artist: "",
	});
	const db = getDatabase();
	const handleSubmit = async (e) => {
		e.preventDefault();
		var data = {
			artist: newUser.artist,
			title: newUser.title,
			songUrl: uploadedSong,
			coverUrl: uploadedImage,
			userId: user.uid || "",
		};

		axios

			.post(
				"https://incandescent-act-production.up.railway.app/upload/addSongWithFirebase",
				data
			)
			.then((res) => {
				// res.data.songData._id;
				console.log(res.data.songData._id);
				// set(ref(db, "users/" + user.uid), {
				// 	0: res.data.songData._id,
				// });
				// ref(`user${user.uid}`).push(res.data.songData._id);
				setAlert(["Song Is Uploaded", ...Alert]);
				setImageProgress(0);
				setSongProgress(0);
				setUploadedImage(null);
				setUploadedSong(null);
				setUploadSong(null);
				setUploadImage(null);
				setNewUser({
					title: "",
					artist: "",
				});
				setUploadedImage("");
				setUploadedSong("");
			})
			.catch((err) => {
				setAlert(["Upload Failed", ...Alert]);
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
				setImageProgress(progress);
				console.log("Upload is " + progress + "% done");
				// eslint-disable-next-line
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						setAlert(["Upload is paused", ...Alert]);
						break;
					case "running":
						console.log("Upload is running");
						setAlert(["Upload is running", ...Alert]);
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				// eslint-disable-next-line
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						setAlert(["Permission Denied", ...Alert]);
						break;
					case "storage/canceled":
						// User canceled the upload
						setAlert(["Canceled Upload", ...Alert]);

						break;

					// ...

					case "storage/unknown":
						// Unknown error occurred, inspect error.serverResponse
						setAlert(["Unknown Error Occurred", ...Alert]);

						break;
				}
			},
			() => {
				// Upload completed successfully, now we can get the download URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log("File available at", downloadURL);
					setAlert(["Upload is Completed", ...Alert]);
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
				setSongProgress(progress);
				console.log("Upload is " + progress + "% done");
				// eslint-disable-next-line
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						setAlert(["Upload is paused", ...Alert]);
						break;
					case "running":
						console.log("Upload is running");
						setAlert(["Upload is running", ...Alert]);
						break;
				}
			},
			(error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				// eslint-disable-next-line
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
					setAlert(["Upload is Done", ...Alert]);
					setUploadedSong(downloadURL);
				});
			}
		);
	};

	return (
		<>
			{user ? (
				<div className="InputForm">
					<div id={length < 426 ? "makeWidthBigger" : ""} className="banner">
						<img alt="Upload Banner" src="images/UploadBanner.svg" />
					</div>
					<div className="UploadForm">
						<form onSubmit={handleSubmit} encType="multipart/form-data">
							<div className="files">
								<div className="divFileUpload">
									<label htmlFor="image">
										<img
											alt="UploadImage"
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

									<progress id="file" value={imageProgress} max="100">
										{imageProgress}%
									</progress>
								</div>

								<div className="divFileUpload">
									<label htmlFor="song">
										{UploadSong ? (
											<p>{UploadSong.name}</p>
										) : (
											<>
												<img alt="Upload song" src="/images/UploadSong.svg" />
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
									<progress id="file" value={songProgress} max="100">
										{songProgress}%
									</progress>
								</div>
							</div>
							<div className="OtherInputs">
								<input
									type="text"
									placeholder="Title"
									name="title"
									required
									value={newUser.title}
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
										uploadedImage !== null && uploadedSong !== null
											? false
											: true
									}
								/>
							</div>
						</form>
					</div>
				</div>
			) : (
				<>
					<div className="NotLoggedInUpload">
						<h1>You need to be logged in to upload a song</h1>
						<Link to="/login">
							<button>Login</button>
						</Link>
					</div>
				</>
			)}
		</>
	);
}

export default Upload;
