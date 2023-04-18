const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.HOST_PORT;

app.use(express.static('public'));
app.use(express.json());

const {initDB, existAlbum, addAlbum, editAlbum, getAlbums, getAlbum, deleteAlbum, initSampleAlbums} = require('./database.js');

// initSampleAlbums();

app.get('/albums', async (req, res) => { 
	try {
		let albums = await getAlbums();
		res.json(albums);
	} catch(err) {
		console.error('Error while getting albums' + err);
	}
});

app.get('/albums/:title', async (req, res) => {
	let resp_data = "";

	try {
		let album = await getAlbum(req.params.title);
		if (album === null) res.status(404);
		resp_data = album !== null ? album : {message: "No albums found"};
	} catch (e) {
		console.error(e);
		res.status(400)
		resp_data = e._message;
	}
	res.json(resp_data);
});

app.post('/albums', async (req, res) => {
	let dbResp = ""

	if (!req.body) {return sendStatus(400)}

	try {
		const album = {title, artist, year} = req.body
		if (await existAlbum(album)) {
			res.status(409)
		} else {
			dbResp = await addAlbum(album);
			res.status(201);
		}
	} catch(e) {
		console.error(e);
		dbResp = {message: e._message}
		res.status(400);
	}
	res.json(dbResp);
});

app.put('/albums/:id', async (req, res) => {
	let dbResp = "";
	const aId = req.params.id;

	if (!req.body) {return sendStatus(400)}

	try {
		dbResp = await editAlbum(aId, {title, artist, year} = req.body);
		if (dbResp === null) {
			dbResp = {message: "Not Found"};
			res.status(404);
		}
	} catch(e) {
		console.error(e);
		dbResp = {message: e._message}
		res.status(400);
	}
	res.json(dbResp);
});

app.delete('/albums/:id', async (req, res) => {
	try {
		const dbResp = await deleteAlbum(req.params.id);
		if (dbResp === null) res.sendStatus(404);
		else res.sendStatus(200);
	} catch(e) {
		console.error(e);
		res.sendStatus(500);
	}
});

app.listen(port, () => {
	initDB().catch(err => console.error('DB connection error:', err));
	console.log('Server listening on container port: ' + port);
});