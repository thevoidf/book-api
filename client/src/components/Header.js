import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

import jwtDecode from 'jwt-decode';

class Header extends Component {
	render() {
		return (
			<header className="Header cf">
				<div className="wrapper">
					{ localStorage.getItem('token') ?
						<div className="nav">
							<div className="left">
								<Link to="/">Home</Link>
								<Link to="/books">Books</Link>
								<Link to="/books/create">Create Book</Link>
							</div>
							<div className="right">
							<Link to="/books">{jwtDecode(localStorage.getItem('token')).username}</Link>
								<Link to="/" onClick={() => {
									localStorage.removeItem('token')
									this.onAuth(false);
								} }>Log out</Link>
							</div>
						</div> :
						<div className="nav">
							<div className="left">
								<Link to="/">Home</Link>
							</div>
							<div className="right">
								<Link to="/login">Login</Link>
								<Link to="/signup">SignUp</Link>
							</div>
						</div> }
				</div>
			</header>
		);
	}
}

export default Header;
