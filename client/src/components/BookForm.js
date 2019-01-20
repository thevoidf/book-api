import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../css/BookForm.css';

class BookForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',

			edit: props.edit || false,
			error: '',
			submited: false
		}
	}

	componentDidMount() {
		if (this.state.edit) {
			const { id } = this.props.match.params;
			fetch(`/books/${id}`)
				.then(resp => resp.json())
				.then(book => {
					console.log(book)
					this.setState({
						title: book.title,
						description: book.description
					});
				}).catch(error => console.log(error));
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const user = jwtDecode(token);
		const book = {
			title: this.state.title,
			description: this.state.description,
			user: user.id
		}

		let id = '';
		if (this.state.edit) {
			id = this.props.match.params.id;
			delete book.user;
		}

		fetch(this.state.edit ? `/books/${id}/update` : '/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(book)
		}).then(resp => resp.json())
			.then(result => {
				console.log(result);

				if (result.error) {
					return this.setState({
						error: true
					});
				}

				this.setState({
					submited: true
				});
			}).catch(error => console.log(error));
	}

	onTitleChanged(e) {
		this.setState({ title: e.target.value });
	}

	onDescriptionChanged(e) {
		this.setState({ description: e.target.value });
	}

	onDelete() {
		const token = localStorage.getItem('token');
		const { id } = this.props.match.params;

		fetch(`/books/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(resp => resp.json())
			.then(result => {
				if (result.error) {
					return this.setState({
						error: true
					});
				}

				this.setState({
					submited: true
				});
			}).catch(error => console.log(error));
	}

	render() {
		if (this.state.submited) {
			return <Redirect to="/books" />
		}

		return (
			<div className="BookForm" onSubmit={this.onSubmit.bind(this)}>
				<form className="SignUp simple-form">
					<p className="error">{ this.state.error ? 'Invalid input' : '' }</p>
					<input
						className="form-input"
						type="text"
						placeholder="Title"
						value={this.state.title}
						onChange={this.onTitleChanged.bind(this)} />
					<textarea
						className="form-input"
						type="email"
						placeholder="Description"
						value={this.state.description}
						onChange={this.onDescriptionChanged.bind(this)}></textarea>
					<input type="submit" className="button add" value={this.state.edit ? "Edit" : "Create"} />
					{ this.state.edit ?
						<input
							type="submit"
							className="button delete"
							value="Delete"
							onClick={this.onDelete.bind(this)} /> : '' }
				</form>
			</div>
		);
	}
}

export default BookForm;
