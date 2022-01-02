import "./App.scss";
import Songs from "./components/Songs";
import Upload from "./components/Upload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Users from "./components/Users";
function App() {
	const context = useContext(AuthContext);

	const { data, favoriteSongs } = context;
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/upload">
						<Navbar />
						<Upload />
					</Route>
					<Route exact path="/Favorites">
						<Navbar />
						<div
							style={{
								marginTop: "80px",
							}}
						>
							<Favorites data={favoriteSongs} />
						</div>
					</Route>
					<Route exact path="/">
						<Navbar />
						<div
							style={{
								marginTop: "80px",
							}}
						>
							<Songs data={data} useHeader={true} />
						</div>
					</Route>
					<Route exact path="/login">
						<Navbar />
						<Login />
					</Route>
					<Route exact path="/users">
						<Navbar />
						<Users />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
