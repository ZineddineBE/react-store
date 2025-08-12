import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Card from "./Article.jsx";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(
			`https://api.store.maxencehammen.com/articles?page=${currentPage}`
		)
			.then((res) => res.json())
			.then((json) => setArticles(json))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [currentPage]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error.message}</p>;
	}

	const totalPages = articles.pagination.totalPages;

	function previous() {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	}

	function next() {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	}

	return (
		<main>
			<h2>Articles disponibles</h2>
			<p className="detail-pagination">{(currentPage - 1) * articles.data.length + 1}-{articles.data.length * currentPage} of {articles.pagination.total} articles</p>

			<div className="articles">
				{articles.data.map((article) => (
					<div className="article" key={article.id}>
						<NavLink to={`/articles/${article.id}`}>
							<Card
								art={article}
								src={article.imageUrl}
								title={article.title}
								price={article.price}
							/>
						</NavLink>
					</div>
				))}
			</div>

			<div className="buttons-pagination">
				<button
					type="button"
					onClick={previous}
					className={`${currentPage === 1 ? "disabled-button" : ""}`}>
					Previous
				</button>
				<button
					type="button"
					onClick={next}
					className={`${currentPage === totalPages ? "disabled-button" : ""}`}>
					Next
				</button>
			</div>
		</main>
	);
}
