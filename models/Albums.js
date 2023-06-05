const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  position: Number,
  release_name: String,
  artist_name: String,
  release_date: String,
  descriptors: String,
},
{ collection: 'Top_5000_albums' }
);

const Album = mongoose.model('Album', albumSchema, 'Albums');

module.exports = Album;