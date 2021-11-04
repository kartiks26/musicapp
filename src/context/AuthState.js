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

	const login = (user) => {
		setUser(user);
		localStorage.setItem("MusicUser", JSON.stringify(user));
		// store user in cookies
	};
	const url = "http://localhost:4000";

	useEffect(async () => {
		try {
			const response = await fetch(`${url}/upload/getAllSongs/`);
			const json = await response.json();

			setData(json.songs);
		} catch (error) {
			console.log(error);
		}
	}, []);
	const firebaseApp = initializeApp({
		apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
		authDomain: "users-e2358.firebaseapp.com",
		projectId: "users-e2358",
		storageBucket: "users-e2358.appspot.com",
		messagingSenderId: "322018798621",
		appId: "1:322018798621:web:3306a362e605c6a29f2af4",
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
				if (querySnapshot.docs.length == 0) {
					const docRef = await addDoc(FavSongs, {
						song,
						user: user.uid,
					});
					setFavoriteSongs([...favoriteSongs, song]);
				} else {
					console.log("Song already in favorites");
				}
			} catch (e) {
				console.error("Error adding document: ", e);
			}
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
			});
		}
	}, [user]);

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
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthState;
