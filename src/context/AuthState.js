import AuthContext from "./AuthContext";
import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";

const AuthState = (props) => {
	const [user, setUser] = useState(null);
	const [currentSong, setCurrentSong] = useState(null);
	const [data, setData] = useState([]);
	const [favoriteSongs, setFavoriteSongs] = useState([]);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [uploadedSong, setUploadedSong] = useState(null);
	// const [ShuffleSongs, setShuffleSongs] = useState([]);
	const [Alert, setAlert] = useState([]);
	const login = (user) => {
		setUser(user);
		localStorage.setItem("MusicUser", JSON.stringify(user));
		// store user in cookies
	};
	const url = "https://incandescent-act-production.up.railway.app";
	// eslint-disable-next-line
	useEffect(async () => {
		try {
			const response = await fetch(`${url}/upload/getAllSongs/`);
			const json = await response.json();

			setData(json.songs);
		} catch (error) {
			setAlert(["Error Occurred", ...Alert]);
			console.log(error);
		}
		// eslint-disable-next-line
	}, []);
	// eslint-disable-next-line
	const firebaseApp = initializeApp({
		apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
		authDomain: "users-e2358.firebaseapp.com",
		projectId: "users-e2358",
		messagingSenderId: "322018798621",
		appId: "1:322018798621:web:3306a362e605c6a29f2af4",
		storageBucket: "gs://users-e2358.appspot.com",
	});
	const db = getFirestore();

	window.addEventListener("load", async () => {
		if (user) {
			const FavSongs = collection(db, "songs");

			const q = query(FavSongs, where("user", "==", user.uid));
			const querySnapshot = await getDocs(q);
			const songs = querySnapshot.docs.map((doc) => doc.data().song);
			setFavoriteSongs(songs);
		}
	});
	const addFavorite = async (song) => {
		if (user) {
			const FavSongs = collection(db, "songs");
			try {
				const q = query(
					FavSongs,
					where("user", "==", user.uid),
					where("song", "==", song)
				);
				const querySnapshot = await getDocs(q);
				if (querySnapshot.docs.length === 0) {
					const docRef = await addDoc(FavSongs, {
						song,
						user: user.uid,
					});
					console.log(docRef);
					setFavoriteSongs([...favoriteSongs, song]);
				} else {
					console.log("Song already in favorites");
					setAlert(["Song already in favorites", ...Alert]);
				}
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		} else {
			setAlert(["Please Login to add to favorites", ...Alert]);
		}
	};

	useEffect(() => {
		if (user) {
			const FavSongs = collection(db, "songs");

			const q = query(FavSongs, where("user", "==", user.uid));
			const querySnapshot = getDocs(q);
			querySnapshot.then((snapshot) => {
				const songs = snapshot.docs.map((doc) => doc.data().song);
				setFavoriteSongs(songs);
				setAlert(["Songs Loading", ...Alert]);
			});
		}
		// eslint-disable-next-line
	}, [user]);

	// useEffect(() => {
	// 	data.map((song) => {
	// 		ShufflingSongs.push(song.SongUrl);
	// 	});
	// 	setShuffleSongs(ShufflingSongs);
	// }, [data]);
	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				setCurrentSong,
				currentSong,
				login,
				data,
				setData,
				favoriteSongs,
				setFavoriteSongs,
				addFavorite,
				uploadedImage,
				setUploadedImage,
				uploadedSong,
				setUploadedSong,
				Alert,
				setAlert,
				// ShuffleSongs,
				// setShuffleSongs,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthState;
