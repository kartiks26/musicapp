import { initializeApp } from "firebase/app";
const firebaseConfig = {
	apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
	authDomain: "users-e2358.firebaseapp.com",
	projectId: "users-e2358",
	storageBucket: "users-e2358.appspot.com",
	messagingSenderId: "322018798621",
	appId: "1:322018798621:web:3306a362e605c6a29f2af4",
};
const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
