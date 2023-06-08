const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    User: { type: Number },
    review: String,
  },
  { timestamps: true, collection: 'Reviews' } // specify the collection name here
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };