const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
	title: { type: String, required: true },
	artist: { type: String, required: true },
	year: Number
});

const Album = mongoose.model('Album', albumSchema, 'albums');

module.exports = Album;