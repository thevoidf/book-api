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
			username: this.usernameInput.value,
			email: this.emailInput.value,
			isAdmin: this.isAdminInput.checked,
			password: this.passwordInput.value
		}

		fetch('/users', {
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
			<div className="SignUp" onSubmit={this.onSubmit.bind(this)}>
				<form className="SignUp simple-form">
					<p className="error">{ this.state.error ? 'Invalid input' : '' }</p>
					<input
						className="form-input"
						type="text"
						placeholder="Username"
						ref={input => this.usernameInput = input} />

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


						<div className="checkbox">
							<input
								id="admin"
								type="checkbox"
								ref={input => this.isAdminInput = input} />
							<label htmlFor="admin">Is admin</label>
						</div>

						<input type="submit" className="button" value="Sign Up" />
					</form>
				</div>
		);
	}
}

export default SignUp;
