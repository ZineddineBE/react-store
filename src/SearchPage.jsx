import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useSearchParams } from "react-router";
import Card from "./Article.jsx";

export default function ConversationsPage() {
	const [searchParams] = useSearchParams();
    const search = searchParams.get("q");

	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`https://api.store.maxencehammen.com/articles/search?q=${search}`)
			.then((res) => res.json())
			.then((json) => setArticles(json.data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [search]);

	if (loading) {
	    return <p>Loading...</p>;
	}

	if (error) {
	    return <p>{error.message}</p>;
	}

	return (
		<main>
			<h2>Articles disponibles pour la recherche : "{search}"</h2>

			<div className="articles">
				{articles.length > 0 ? (
					articles.map((article) => (
						<div className="article">
							<NavLink to={`/articles/${article.id}`}>
								<Card
									key={article.id}
									art={article}
									src={article.imageUrl}
									title={article.title}
									price={article.price}
								/>
							</NavLink>
						</div>
					))
				) : (
					<div>Aucun article trouvé pour cette recherche.</div>
				)}
			</div>
		</main>
	);
}
