import { Routes, Route } from "react-router";
import Home from "./Home.jsx";
import ArticlePage from "./ArticlePage.jsx";
import CartPage from "./CartPage.jsx";
import SearchPage from "./SearchPage.jsx";

export default function AppRoutes() {
    return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/articles/search" element={<SearchPage />} />
			<Route path="/articles/:articleId" element={<ArticlePage />} />
			<Route path="/cart" element={<CartPage />} />
		</Routes>
	);
}

