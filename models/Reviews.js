const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user_id: String,
  review_id: String,
  review: String,
});

module.exports = mongoose.model('Review', reviewSchema);