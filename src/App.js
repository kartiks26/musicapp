import "./App.scss";
import Songs from "./components/Songs";
import Upload from "./components/Upload";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Favorites from "./components/Favorites";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Alert from "./components/Alert";
function App() {
	const context = useContext(AuthContext);
	const { data, favoriteSongs } = context;
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/upload">
						<Navbar />
						<Alert />
						<Upload />
					</Route>
					<Route exact path="/Favorites">
						<Navbar />
						<Alert />
						<Favorites data={favoriteSongs} />
					</Route>
					<Route exact path="/">
						<Navbar />
						<Alert />
						<Songs data={data} />
					</Route>
					<Route exact path="/login">
						<Navbar />
						<Alert />
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
