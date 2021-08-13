import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [bookmark, setBookmark] = useState([]);
	const [allBookmarks, setAllBookmarks] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/bookmark');
				const data = await response.json();
				setAllBookmarks(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/bookmark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bookmark)
			});
			const data = await response.json();
			setAllBookmarks([...allBookmarks, data]);
			setBookmark({
				name: '',
				url: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setBookmark({ ...bookmark, [e.target.id]: e.target.value });
	};

	return (
		<div className="HomePage">
			<h3>BOOKMARK APP</h3>
			<div className="formpart">
				<form onSubmit={handleSubmit}>
					<label>Enter Short Name </label>{' '}
					<input
						type="text"
						id="name"
						placeholder="GA-Material"
						value={bookmark.name}
						onChange={handleChange}
					/>{' '}
					<label>Enter URL </label>{' '}
					<input
						type="text"
						id="url"
						placeholder="https://sfs-flex-1.herokuapp.com"
						value={bookmark.url}
						onChange={handleChange}
					/>{' '}
					<input className="buttonclass" type="submit" value="Add" />
				</form>
			</div>
			<div className="listpart">
				<ul className="list">
					{allBookmarks.map(bookmark => {
						return (
							<li key={bookmark._id}>
								<Link to={`/${bookmark._id}`}>
									<p>{bookmark.name}</p>
								</Link>
								<p> {bookmark.url}</p>
								<p>...............................</p>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
