const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const books = require('./routes/books');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/book-api', { useNewUrlParser: true });

app.use('/books', books);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on port: ${port}`));
