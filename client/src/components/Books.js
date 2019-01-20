import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

import Book from './Book';

class Books extends Component {
	constructor() {
		super();

		this.state = {
			books: []
		}
	}

	componentDidMount() {
		const user = jwtDecode(localStorage.getItem('token'));

		fetch(user.isAdmin ? '/books' : `/books/${user.id}/user`)
			.then(resp => resp.json())
			.then(books => {
				this.setState({ books });
			});
	}

	render() {
		return (
			<div className="Books">
				{ this.state.books.map((book, i) =>
					<Book
						key={i}
						title={book.title}
						to={`/books/${book._id}/update`}
						description={book.description}/>) }
			</div>
		);
	}
}

export default Books;
