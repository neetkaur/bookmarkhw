import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [bookmark, setbookmark] = useState({});
	const nameInput = useRef(null);
	const urlInput = useRef(null);

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/bookmark/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameInput.current.value,
					url: urlInput.current.value
				})
			});
			const data = await response.json();
			setbookmark(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmark/${props.match.params.id}`);
				const data = await response.json();
				setbookmark(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/bookmark/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedbookmark = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/Home');
		}
	};
	return (
		<div className="HomePage">
			<div className="formpart">
				<form
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-evenly'
					}}
					onSubmit={handleUpdate}
				>
					<label>
						{' '}
						Name:{' '}
						<input type="text" ref={nameInput} defaultValue={bookmark.name} />
					</label>
					<label>
						{' '}
						URL:{' '}
						<input type="text" ref={urlInput} defaultValue={bookmark.url} />
					</label>
					<input className="buttonclass" type="submit" value="Update" />
					<button className="buttonclass" onClick={handleDelete}>
						Delete
					</button>
				</form>
			</div>
			<div className="listpart">
				{Object.keys(bookmark).length ? (
					<>
						<p>{bookmark.name}</p>
						<p>{bookmark.url}</p>
					</>
				) : (
					<h1> Loading...</h1>
				)}
			</div>
		</div>
	);
}
