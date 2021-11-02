import "./App.scss";
import Songs from "./components/Songs";
import Upload from "./components/Upload";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/upload">
						<Navbar />
						<Upload />
					</Route>
					<Route exact path="/">
						<Navbar />
						<Songs />
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
