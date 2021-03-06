// https://users-e2358-default-rtdb.firebaseio.com/
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "@firebase/database";
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
function writeUserData(userUId, name, imageUrl) {
	const db = getDatabase();

	const userRef = ref(db, "users/" + userUId);
	onValue(userRef, (snapshot) => {
		const data = snapshot.val();
		if (!data) {
			set(ref(db, "users/" + userUId), {
				displayName: name,
				photoURL: imageUrl,
				followers: 0,
				following: 0,
				uploads: 0,
				userId: userUId,
			});
		}
	});
}
export function getAllUsers() {
	const db = getDatabase();
	const usersRef = ref(db, "users");
	return onValue(usersRef, (snapshot) => {
		const data = snapshot.val();
		if (!data) {
			return [];
		}
		return Object.keys(data).map((key) => ({
			key,
			...data[key],
		}));
	});
}

export default writeUserData;
