require('dotenv').config();
const mongoose = require('mongoose');
const Album = require('./models/Album.js');

// used on server start
async function initDB() {
  await mongoose.connect(process.env.DB_URL);
}

getAlbums = async () => await Album.find();

getAlbum = async (title) => {
  return await Album.findOne({title: title});
}

addAlbum = async (data) => {
    const album = new Album(data)
    return await album.save(); 
}

deleteAlbum = async (id) => await Album.findByIdAndDelete(id);

initSampleAlbums = async () => {
  try {
    await Album.insertMany(
      [
        {'title': 'My Life Story', 'artist': 'James Brown', 'year': 1987},
        {'title': 'Blue Horison', 'artist': 'Rickie Martin', 'year': 2020},
        {'title': 'Welcome Home', 'artist': 'Shakira', 'year': 1981}
      ]
    );
  } catch(e) {
    console.error(e);
  }
}

module.exports = { initDB, addAlbum, getAlbums, getAlbum, deleteAlbum, initSampleAlbums }