const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    User: { type: Number },
    review: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);