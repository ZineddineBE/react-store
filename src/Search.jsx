import { useState } from "react";
import { useSearchParams } from "react-router";


export default function Search({ onSubmit }) {
	const [searchParams] = useSearchParams();
	const search = searchParams.get("q");
	const [text, setText] = useState(search);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		onSubmit(text);
	};


	return (
		<form className="formSearch" onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Search..."
			/>
			<button type="submit">
				Search
			</button>
		</form>
	);
}
