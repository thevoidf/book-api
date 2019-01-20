import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
	constructor() {
		super();
		this.state = {
			error: '',
			submited: false
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			email: this.emailInput.value,
			password: this.passwordInput.value
		}

		fetch('/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(resp => resp.json())
			.then(result => {
				console.log(result);

				if (result.error) {
					return this.setState({
						error: true
					});
				}

				localStorage.setItem('token', result.token);
				this.props.onAuth(true);
				this.setState({
					submited: true
				});
			}).catch(error => console.log(error))

		console.log(user)
	}

	render() {
		if (this.state.submited) {
			return <Redirect to="/" />
		}

		return (
			<div className="Login" onSubmit={this.onSubmit.bind(this)}>
				<form className="SignUp simple-form">
					<p className="error">{ this.state.error ? 'Invalid email or password' : '' }</p>
						<input
							className="form-input"
							type="email"
							placeholder="Email"
							ref={input => this.emailInput = input} />

						<input
							className="form-input"
							type="password"
							placeholder="Password"
							ref={input => this.passwordInput = input} />
						<input type="submit" className="button" value="Log in" />
					</form>
				</div>
		);
	}
}

export default SignUp;
