import React, { useContext } from "react";
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

function Login() {
	const firebaseConfig = {
		apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
		authDomain: "users-e2358.firebaseapp.com",
		projectId: "users-e2358",
		storageBucket: "users-e2358.appspot.com",
		messagingSenderId: "322018798621",
		appId: "1:322018798621:web:3306a362e605c6a29f2af4",
		storageBucket: "gs://users-e2358.appspot.com",
	};

	const app = initializeApp(firebaseConfig);

	const context = useContext(AuthContext);
	const { user, setUser, login } = context;
	const GoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((res) => {
				setUser(res.user);
				login(res.user);

				console.log(res.user);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const FacebookLogin = () => {
		const provider = new FacebookAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((res) => {
				setUser(res.user);
				login(res.user);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const TwitterLogin = () => {
		const provider = new TwitterAuthProvider();
		const auth = getAuth();

		signInWithPopup(auth, provider)
			.then((res) => {
				setUser(res.user);
				login(res.user);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="Authentication">
			<img
				onClick={() => {
					GoogleLogin();
				}}
				src="/images/Google.svg"
			/>
			<img
				onClick={() => {
					FacebookLogin();
				}}
				src="/images/Facebook.svg"
			/>
			<img
				onClick={() => {
					TwitterLogin();
				}}
				src="/images/Twitter.svg"
			/>
		</div>
	);
}

export default Login;