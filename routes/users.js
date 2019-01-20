const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const { signToken } = require('../utils');

router.post('/', (req, res) => {
	const user = new User({
		_id: mongoose.Types.ObjectId(),
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		isAdmin: req.body.isAdmin || false
	});

	user.save().then(result => {
		return signToken({
			username: user.username,
			email: user.email,
			isAdmin: user.isAdmin
		});
	}).then(token => {
		res.status(201).json({
			message: 'success',
			token,
			user
		});
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			error: error.message || 'Failed to create user'
		});
	});
});

router.post('/login', (req, res) => {
	const { email, password } = req.body;

	User
		.findOne({ email })
		.then(user => {
			return new Promise((resolve, reject) => {
				user.comparePassword(password, (error, isCorrect) => {
					if (error) return reject(error);
					resolve([user, isCorrect]);
				});
			})
		}).then(([user, isCorrect]) => {
			if (!isCorrect)
				return Promise.reject({ message: 'Incorrect password' });
			return signToken({
				username: user.username,
				email,
				isAdmin: user.isAdmin
			});
		}).then(token => {
			res.status(200).json({
				message: 'success',
				token
			});
		}).catch(error => {
			console.log(error);
			res.status(500).json({
				error: error.message || 'Failed to login user'
			});
		});
});

module.exports = router;
