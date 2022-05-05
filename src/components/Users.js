import React, { useEffect, useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "@firebase/database";
import "../css/Users.scss";
import AuthContext from "../context/AuthContext";
import Favorites from "./Favorites";
import Songs from "./Songs";
const REACT_APP_MUSIC_API = process.env.REACT_APP_MUSIC_API;

function Users() {
  const firebaseConfig = {
    apiKey: "AIzaSyDLj-taD0dvM6ETYt4PyNsZBWH-mZwgSdI",
    authDomain: "users-e2358.firebaseapp.com",
    projectId: "users-e2358",
    messagingSenderId: "322018798621",
    appId: "1:322018798621:web:3306a362e605c6a29f2af4",
    storageBucket: "gs://users-e2358.appspot.com",
    databaseURL: "https://users-e2358-default-rtdb.firebaseio.com/",
  };
  const [users, setUsers] = useState([]);
  const [userModal, setUserModal] = useState(null);
  const context = useContext(AuthContext);
  const { user, setUser, Alert } = context;
  const [userID, setUserID] = useState(null);
  const [userSongData, setUserSongData] = useState([]);
  useEffect(() => {
    if (userID) {
      fetch(`${REACT_APP_MUSIC_API}/upload/getSongsByUser/${userID}`).then(
        (res) => {
          res.json().then((data) => {
            console.log(data);
            setUserSongData(data.songs);
          });
        }
      );
    }
  }, [userID]);
  let data;

  useEffect(() => {
    initializeApp(firebaseConfig);
    const db = getDatabase();
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      data = snapshot.val();
      if (!data) {
        return [];
      }
      data = Object.keys(data).map((key) => ({
        key,
        ...data[key],
      }));

      setUsers(data);
    });
  }, []);
  return (
    <>
      {userModal ? (
        <>
          <div className="UserModalParent">
            <div className="userModal">
              <div className="userModalBody">
                <div className="userModalBody-col1">
                  <div className="userModal-col1-col0">
                    <img src={userModal.photoURL} alt="user" />
                    <h1> {userModal.displayName.toLowerCase()}</h1>
                  </div>
                  <div className="ModalCounts">
                    <div>
                      <h1 align="center">{userSongData.length}</h1>
                      <p>Uploads </p>
                    </div>
                    <div>
                      <h1 align="center">{userModal.followers}</h1>
                      <p>Followers </p>
                    </div>
                    <div>
                      <h1 align="center">{userModal.following}</h1>
                      <p>Following </p>
                    </div>
                  </div>
                  <svg
                    className="CloseButton"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-6 -6 24 24"
                    width="38"
                    fill="white"
                    onClick={() => {
                      setUserModal(null);
                      setUserSongData([]);
                    }}
                  >
                    <path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path>
                  </svg>

                  {user ? (
                    userModal.key == user.uid ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          console.log("USER IS GETTING FOLLOWED");
                        }}
                        className="FollowButton"
                      >
                        Follow
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="UserPosts">
                  <Songs data={userSongData} useHeader={false} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="UsersParent">
        <div className="users">
          {users
            ? users.map((e) => {
                return (
                  <div
                    onClick={() => {
                      setUserModal(e);
                      setUserID(e.userId);
                      console.log(e);
                    }}
                    className="user"
                    key={e.key}
                  >
                    <img src={e.photoURL} />
                    <p>{e.displayName.toLowerCase().split(" ")[0]}</p>
                    <button>Follow</button>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}
export default Users;
