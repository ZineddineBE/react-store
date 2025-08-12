import Header from "./Header.jsx";
import Routes from "./Routes.jsx";
import { BrowserRouter } from "react-router";
import "./style.css";

export default function App() {
	
	return (
		<BrowserRouter>
			<Header />
			<Routes />
		</BrowserRouter>
	);
}
