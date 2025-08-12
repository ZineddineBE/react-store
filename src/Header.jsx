import { Link } from "react-router";
import Search from "./Search.jsx";
import { useNavigate } from "react-router";

function Logo() {
	return (
		<h2>
			<Link to="/">Store</Link>
		</h2>
	);
}

function Basket() {
	return (
		<button className="basket">
			<Link to="/cart">Voir le panier</Link>
		</button>
	);
}


export default function Header() {

	const navigate = useNavigate();

	const onSubmit = (text) => {
		navigate(`/articles/search?q=${text}`);
		
	};

	return (
		<header>
			<Logo />
			<Search onSubmit={onSubmit} />
			<Basket />
		</header>
	);
}
