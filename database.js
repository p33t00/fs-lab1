require('dotenv').config();
const mongoose = require('mongoose');
const Album = require('./models/Album.js');

// used on server start
async function initDB() {
  await mongoose.connect(process.env.DB_URL);
  mongoose.set('strictQuery', true);
}

existAlbum = async (album) => await Album.findOne(album);

getAlbums = async () => await Album.find();

getAlbum = async (title) => {
  return await Album.findOne({title: title});
}

addAlbum = async (data) => {
    const album = new Album(data)
    return await album.save(); 
}

editAlbum = async (id, data) => {
    return await Album.findByIdAndUpdate(id, data, {lean:true, new: true}); 
}

deleteAlbum = async (id) => await Album.findByIdAndDelete(id, {lean: true});

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

module.exports = { initDB, existAlbum, addAlbum, editAlbum, getAlbums, getAlbum, deleteAlbum, initSampleAlbums }