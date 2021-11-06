import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
	authDomain: "users-e2358.firebaseapp.com",
	projectId: "users-e2358",
	storageBucket: "users-e2358.appspot.com",
	messagingSenderId: "322018798621",
	appId: "1:322018798621:web:3306a362e605c6a29f2af4",
	storageBucket: "gs://users-e2358.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export const uploadImages = async (file) => {
	const metadata = {
		contentType: "image/jpeg",
	};
	const storageRef = ref(storage, "images/" + file.name);
	const uploadTask = uploadBytesResumable(storageRef, file, metadata);
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
				return downloadURL;
			});
		}
	);
};

export const uploadSongs = async (file) => {
	const metadata = {
		contentType: "audio/mpeg",
	};
	const storageRef = ref(storage, "songs/" + file.name);
	const uploadTask = uploadBytesResumable(storageRef, file, metadata);
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
				return downloadURL;
			});
		}
	);
};
