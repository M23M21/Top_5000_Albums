const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  position: Number,
  release_name: String,
  artist_name: String,
  release_date: String,
  descriptors: String,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;