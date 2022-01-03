import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../css/Login.scss";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useHistory } from "react-router";
import Songs from "./Songs";
import {
	getStorage,
	uploadBytesResumable,
	getDownloadURL,
	ref,
} from "firebase/storage";

function Login() {
	const firebaseConfig = {
		apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
		authDomain: "users-e2358.firebaseapp.com",
		projectId: "users-e2358",
		messagingSenderId: "322018798621",
		appId: "1:322018798621:web:3306a362e605c6a29f2af4",
		storageBucket: "gs://users-e2358.appspot.com",
		databaseURL: "https://users-e2358-default-rtdb.firebaseio.com/",
	};
	initializeApp(firebaseConfig);
	const storage = getStorage();

	const context = useContext(AuthContext);

	const { setUser, login, Alert, setAlert, user, realtimeData } = context;
	const [LoginSignupToogle, setLoginSignupToogle] = useState(true);
	const history = useHistory();
	const [ProfileImage, setProfileImage] = useState();
	const [UploadOpacity, setUploadOpacity] = useState("100%");
	const [ProfileImageUrl, setProfileImageUrl] = useState(
		"https://cdn.dribbble.com/users/5534/screenshots/14230133/media/e2f853f8232acad78bf143c32f2f3a04.jpg?compress=1&resize=400x300"
	);
	const [userData, setUserData] = useState({
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
		photoURL: ProfileImageUrl,
	});
	const userDataOnChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
		console.log(userData);
	};
	const signInWithEmailAndPassword = () => {
		if (userData.password !== userData.confirmPassword) {
			alert("Password and Confirm Password does not match");
			setUserData({ ...userData, password: "", confirmPassword: "" });
			return;
		}
		// const auth = getAuth();
		// createUserWithEmailAndPassword(auth, userData.email, userData.password)
		// 	.then((userCredential) => {
		// 		// Signed in
		// 		console.log(userCredential);
		// 		// ...
		// 	})
		// 	.catch((error) => {
		// 		const errorCode = error.code;
		// 		const errorMessage = error.message;
		// 		// ..
		// 	});
		const userId = userData.email.split("@")[0];
		const user = {
			displayName: userData.displayName,
			email: userData.email,
			photoURL: userData.photoURL,
			uid: userId,
		};
		setUser(user);
		login(user);
		history.push("/");
	};
	const LoginWthEmail = () => {
		console.log("getting called Here");
		const email = userData.email.split("@")[0];
		setAlert(["Login Not Working Try To Signup", ...Alert]);
		const notification = new Notification("Login Not Working Try To Signup");
		history.push("/");
	};
	const GoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((res) => {
				setAlert(["Login Successfully", ...Alert]);

				setUser(res.user);
				login(res.user);
				history.push("/");
			})
			.catch((err) => {
				console.log(err);
				setAlert(["Login Failed", ...Alert]);
			});
	};
	const FacebookLogin = () => {
		const provider = new FacebookAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((res) => {
				setAlert(["Login Successfully", ...Alert]);

				setUser(res.user);
				login(res.user);

				history.push("/");
			})
			.catch((err) => {
				console.log(err);
				setAlert(["Login Failed", ...Alert]);
			});
	};
	const TwitterLogin = () => {
		const provider = new TwitterAuthProvider();
		const auth = getAuth();

		signInWithPopup(auth, provider)
			.then((res) => {
				setAlert(["Login Successfully", ...Alert]);

				setUser(res.user);
				login(res.user);

				history.push("/");
			})
			.catch((err) => {
				setAlert(["Login Failed", ...Alert]);

				console.log(err);
			});
	};

	const Logout = () => {
		localStorage.removeItem("MusicUser");
		setUser(null);
		setAlert(["Logged Out Successfully", ...Alert]);
		if (Notification.permission === "granted") {
			var options = {
				body: "Enjoy your music on The Go At Musicano",
				icon: "/images/logo192.png",
				dir: "ltr",
				image:
					"https://www.musicnotes.com/images2/promos/store/900x520_piano-min.jpg",
				tag: "musicano",
			};
			var notification = new Notification("Logged Out Successfully", options);
			notification.onclick = function () {
				window.open("/login");
			};
		} else {
			Notification.requestPermission();
		}
	};
	const [uploadedSong, setUploadedSong] = useState([]);
	useEffect(() => {
		if (user) {
			fetch(
				`https://incandescent-act-production.up.railway.app/upload/getSongsByUser/${user.uid}`
			).then((res) => {
				res.json().then((data) => {
					console.log(data);
					setUploadedSong(data.songs);
				});
			});
		}
	}, []);

	return (
		<>
			{user ? (
				<div className="loggedIn">
					<div className="LoginHeaders">
						<h1>welcome {user.displayName} ,</h1>

						<button
							onClick={() => {
								Logout();
							}}
						>
							Logout
						</button>
					</div>
					<div className="LoginBody">
						<img src={user.photoURL} alt="user" />
						<div className="folCount">
							<h1 align="center">{uploadedSong.length}</h1>
							<p>Uploads </p>
						</div>
						<div className="folCount">
							<h1 align="center">
								{realtimeData ? realtimeData.followers : 0}
							</h1>
							<p>Followers </p>
						</div>
						<div className="folCount">
							<h1 align="center">
								{realtimeData ? realtimeData.following : 0}
							</h1>
							<p>Following </p>
						</div>
					</div>
					<div className="UserPosts">
						<Songs data={uploadedSong} useHeader={false} />
					</div>
				</div>
			) : (
				<div className="Authentication">
					<div className="AuthBanner">
						{LoginSignupToogle ? (
							<img src="/images/SignUp.svg" />
						) : (
							<img src="/images/SignIn.svg" />
						)}
					</div>
					<div className="AuthBody">
						{LoginSignupToogle ? (
							<div className="MainForm">
								<p>Signin To Enjoy More</p>
								<input
									type="email"
									placeholder="Email"
									value={userData.email}
									name="email"
									onChange={userDataOnChange}
								/>
								<input
									type="password"
									placeholder="Password"
									value={userData.password}
									name="password"
									onChange={userDataOnChange}
								/>
								<input
									type="submit"
									onClick={() => {
										LoginWthEmail();
									}}
								/>
								<p>
									Don`t have an account{" "}
									<a
										onClick={() => {
											setLoginSignupToogle(false);
											setUserData({ ...userData, email: "", password: "" });
										}}
									>
										signup ,
									</a>
								</p>
								<div className="AUthProviders">
									<img
										alt="Google"
										onClick={() => {
											GoogleLogin();
										}}
										src="/images/Google.svg"
									/>
									<img
										alt="Facebook"
										onClick={() => {
											FacebookLogin();
										}}
										src="/images/Facebook.svg"
									/>
									<img
										alt="Twitter"
										onClick={() => {
											TwitterLogin();
										}}
										src="/images/Twitter.svg"
									/>
								</div>
							</div>
						) : (
							<div className="MainForm">
								<p>Signup In Really Fast Steps</p>
								<label id="profImg" htmlFor="profileImage">
									<img
										style={{
											opacity: UploadOpacity,
										}}
										src={
											ProfileImage
												? URL.createObjectURL(ProfileImage)
												: "https://cdn.dribbble.com/users/5534/screenshots/14230133/media/e2f853f8232acad78bf143c32f2f3a04.jpg?compress=1&resize=400x300"
										}
										alt="ProfileImage"
									/>
									<p>Choose Profile Image</p>
								</label>

								<input
									id="profileImage"
									type="file"
									accept="image/*"
									onChange={(e) => {
										if (e.target.files[0]) {
											const storageRef = ref(
												storage,
												"profileImages/" + e.target.files[0].name
											);
											const metadata = {
												contentType: "image/jpeg",
											};
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
														(snapshot.bytesTransferred / snapshot.totalBytes) *
														100;
													console.log("Upload is " + progress + "% done");
													setUploadOpacity(progress + "%");
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
													getDownloadURL(uploadTask.snapshot.ref).then(
														(downloadURL) => {
															console.log("File available at", downloadURL);
															setAlert(["Upload is Completed", ...Alert]);
															setProfileImageUrl(downloadURL);
															setUserData({
																...userData,
																["photoURL"]: downloadURL,
															});
														}
													);
												}
											);
											setProfileImage(e.target.files[0]);
										}
									}}
								/>
								<input
									type="text"
									value={userData.displayName}
									onChange={userDataOnChange}
									placeholder="Name"
									name="displayName"
								/>
								<input
									type="email"
									value={userData.email}
									onChange={userDataOnChange}
									placeholder="Email"
									name="email"
								/>
								<input
									type="password"
									value={userData.password}
									onChange={userDataOnChange}
									placeholder="password"
									name="password"
								/>
								<input
									type="password"
									value={userData.confirmPassword}
									onChange={userDataOnChange}
									placeholder="Confirm Password"
									name="confirmPassword"
								/>
								<input
									type="submit"
									onClick={() => {
										signInWithEmailAndPassword();
									}}
								/>
								<p>
									Already have an account{" "}
									<a
										onClick={() => {
											setLoginSignupToogle(true);
										}}
									>
										signIn
									</a>
								</p>
								<div className="AUthProviders">
									<img
										alt="Google"
										onClick={() => {
											GoogleLogin();
										}}
										src="/images/Google.svg"
									/>
									<img
										alt="Facebook"
										onClick={() => {
											FacebookLogin();
										}}
										src="/images/Facebook.svg"
									/>
									<img
										alt="Twitter"
										onClick={() => {
											TwitterLogin();
										}}
										src="/images/Twitter.svg"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
