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
import { useHistory } from "react-router";
function Login() {
	const firebaseConfig = {
		apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
		authDomain: "users-e2358.firebaseapp.com",
		projectId: "users-e2358",
		messagingSenderId: "322018798621",
		appId: "1:322018798621:web:3306a362e605c6a29f2af4",
		storageBucket: "gs://users-e2358.appspot.com",
	};
	initializeApp(firebaseConfig);

	const context = useContext(AuthContext);

	const { setUser, login, Alert, setAlert } = context;
	const history = useHistory();
	const GoogleLogin = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((res) => {
				setUser(res.user);
				login(res.user);
				setAlert(["Login Successfully", ...Alert]);

				history.push("/");
				console.log(res.user);
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
				setUser(res.user);
				login(res.user);
				setAlert(["Login Successfully", ...Alert]);

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
				setUser(res.user);
				login(res.user);
				setAlert(["Login Successfully", ...Alert]);

				history.push("/");
			})
			.catch((err) => {
				setAlert(["Login Failed", ...Alert]);

				console.log(err);
			});
	};
	return (
		<div className="Authentication">
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
	);
}

export default Login;
