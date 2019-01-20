import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import '../css/App.css';

import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import SignUp from './SignUp';
import BookForm from './BookForm';
import Books from './Books';

class App extends Component {
	constructor() {
		super();

		this.state = {
			isLoggedIn: typeof localStorage.getItem('token') === 'string'
		}
	}

	onAuth(isLoggedIn) {
		this.setState({ isLoggedIn });
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Header />
					<div className="wrapper">
						<Route exact path="/" component={Home} />
						<Route path="/login" render={() => 
							<Login onAuth={this.onAuth.bind(this) } />} />
						<Route path="/signup" render={() => 
							<SignUp onAuth={this.onAuth.bind(this) } />} />

						<Route path="/books/create" render={props => (
							localStorage.getItem('token') ? <BookForm /> : <Redirect to="/login" />
						)} />
						<Route path="/books/:id/update" render={props => (
							localStorage.getItem('token') ? <BookForm edit={true} {...props} /> : <Redirect to="/login" />
						)} />
						<Route exact path="/books" render={props =>
								this.state.isLoggedIn ? <Books {...props} /> : <Redirect to="/login" /> } />
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
