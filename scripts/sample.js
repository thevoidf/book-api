const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/book-api', { useNewUrlParser: true });
const User = require('../models/user');
const Book = require('../models/book');

const bob = new User({
	_id: mongoose.Types.ObjectId(),
	username: 'bob',
	email: 'bob@mail.com',
	password: 'apples'
});
const alex = new User({
	_id: mongoose.Types.ObjectId(),
	username: 'alex',
	email: 'alex@mail.com',
	password: 'apples'
});
const tim = new User({
	_id: mongoose.Types.ObjectId(),
	username: 'tim',
	email: 'tim@mail.com',
	password: 'apples',
	isAdmin: true
});

const cleanCode = new Book({
	_id: mongoose.Types.ObjectId(),
	title: 'Clean Code',
	description: 'by Robert C Martin'
});
const codeComplete = new Book({
	_id: mongoose.Types.ObjectId(),
	title: 'Code Complete',
	description: 'by Steve McConnell'
});
const theC = new Book({
	_id: mongoose.Types.ObjectId(),
	title: 'The C Programming Language',
	description: 'by by Brian Kernighan and Dennis Ritchie'
});
const designPatterns = new Book({
	_id: mongoose.Types.ObjectId(),
	title: 'Design Patterns',
	description: 'Design Patterns: Elements of Reusable Object-Oriented Software is a software engineering book describing software design patterns.'
});

User
	.remove({})
	.then(() => {
		return Book.remove({});
	}).then(() => {
		return Promise.all([bob.save(), alex.save(), tim.save()]);
	}).then(([bob, alex, tim]) => {
		cleanCode.user = bob._id;
		codeComplete.user = bob._id;
		theC.user = alex._id;
		designPatterns.user = tim._id;

		return Promise.all([cleanCode.save(), codeComplete.save(), theC.save(), designPatterns.save()]);
	}).then(books => {
		console.log('Done.');
	}).catch(error => {
		console.log('error:', error);
	});
