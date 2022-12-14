require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/get', (req, res) => {
	const sql = "SELECT * from movies";
	db.query(sql, (err, result) => {
		res.status(200).send(result);
	});
});

app.post('/api/insert', (req, res) => {
	const name = req.body.name;
	const review = req.body.review;
	const sql = "INSERT INTO movies (name, review) VALUES (?, ?)";
	db.query(sql, [name, review], (err, result) => {
		if (err) { console.log(err); }
	});
});

app.delete('/api/delete/:name', (req, res) => {
	const name = req.params.name;
	const sql = "DELETE FROM movies where name = ?";
	db.query(sql, name, (err, result) => {
		if (err) { console.log(err); }
	});
});

app.put('/api/update/', (req, res) => {
	const name = req.body.name;
	const review = req.body.review;
	const sql = "UPDATE movies SET review = ? where name = ?";
	db.query(sql, [review, name], (err, result) => {
		if (err) { console.log(err); }
	});	
});

app.listen(8080, () => {
	console.log('Server is running.');
});