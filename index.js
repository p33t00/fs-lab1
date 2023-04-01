const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}))

const {initDB, addAlbum, getAlbums, getAlbum, deleteAlbum, initSampleAlbums} = require('./database.js');

// initSampleAlbums();

app.get('/', (req, res) => { 
	let sendBack = {message: 'This lab 1', name: 'HKR'}
	res.json(sendBack);
});

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
		resp_data = album !== null ? album : 'No albums found';
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
		dbResp = await addAlbum({title, artist, year} = req.body);
	} catch(e) {
		console.error(e);
		dbResp = {message: e._message}
		res.status(400);
	}
	res.json(dbResp);
});

app.delete('/albums/:id', async (req, res) => {
	try {
		deleteAlbum(req.params.id);
		res.sendStatus(200);
	} catch(e) {
		console.error(e);
		res.sendStatus(500);
	}
});

app.listen(3000, () => {
	initDB().catch(err => console.error('DB connection error:', err));
	console.log('Server listening on container port: ' + 3000);
});