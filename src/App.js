import "./App.scss";
import Songs from "./components/Songs";
import Upload from "./components/Upload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
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
						<Favorites data={favoriteSongs} />
					</Route>
					<Route exact path="/">
						<Navbar />
						<Songs data={data} />
					</Route>
					<Route exact path="/login">
						<Navbar />
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
