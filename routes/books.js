const express = require('express');
const router = express.Router();
const Book = require('../models/book')

router.post('/', (req, res) => {
	const book = new Book({
		title: req.body.title,
		description: req.body.description
	});

	book.save().then(result => {
		res.status(201).json(book);
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			error: error.message || 'failed to create book'
		});
	});
});

router.get('/', (req, res) => {
	Book
		.find()
		.then(result => {
			res.status(200).json(result);
		}).catch(error => {
			console.log(error);
			res.json({
				error: error.message || 'failed to get all books'
			});
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;

	Book
		.findById(id)
		.then(result => {
			if (!result)
				return res.status(404).json({
					error: `book not found by id: ${id}`
				});
			res.status(200).json(result);
		}).catch(error => {
			console.log(error);
			res.status(500).json({
				error: error.message || `failed to get object by id: ${id}`
			});
		});
});

router.post('/:id/update', (req, res) => {
	const { id } = req.params;
	const newBook = {
		title: req.body.title,
		description: req.body.description
	}

	Book.update({ _id: id }, {
		$set: newBook
	}).then(result => {
		res.status(200).json(result);
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			error: error.message || 'failed to update book'
		});
	});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	Book
		.remove({ _id: id })
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			console.log(error);
			res.json({
				error: error.message || 'failed to get all books'
			});
		});
});

module.exports = router;
