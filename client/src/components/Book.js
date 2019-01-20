import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Book.css';

class Book extends Component {
	render() {
		return (
			<div className="Book">
				<h2 className="title">{this.props.title}</h2> 
				<p className="description">{this.props.description}</p>
				<Link to={this.props.to} className="book-button">
					<input className="button" type="button" value="Edit" />
				</Link>
			</div>
		);
	}
}

export default Book;
