require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const books = require('./routes/books');
const users = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

app.use('/books', books);
app.use('/users', users);

app.use((err, req, res, next) => {
	res.status(500).json({ error: err.message });
	next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on port: ${port}`));
