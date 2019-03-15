const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB config
const { mongoURI } = require('./config/keys');
// Connect to mongoDB
mongoose
	.connect(mongoURI)
	.then(() => {
		console.log('MongoDB Connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.send('hello there');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
