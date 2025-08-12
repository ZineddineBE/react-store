import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";


export default function ConversationsPage() {
	const { articleId } = useParams();
	const [article, setArticle] = useState([]);

	useEffect(() => {
		const url = `https://api.store.maxencehammen.com/articles/${articleId}`;
		fetch(url)
			.then((res) => res.json())
			.then((json) => setArticle(json));
	}, [articleId]);


	return (
		<main>
			<h2>{article.title}</h2>

			<div className="description-article">
				<img src={article.imageUrl} alt={article.title} />

				<div>
					<p className="bold">Description :</p>
					<p>{article.description}</p>

					<p className="bold">Price : {article.price}€</p>

					<button type="button">Add to Cart</button>
				</div>
			</div>
		</main>
	);
};
