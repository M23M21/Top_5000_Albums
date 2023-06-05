const Review = require('../models/Reviews');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    console.log(reviews); // log the retrieved reviews
    res.render('AllReviews', { reviews });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

exports.getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id).populate('user');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the review' });
  }
};


// Create a new review
exports.createReview = async (req, res) => {
  const reviewData = req.body;
  try {
    const review = new Review(reviewData);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the review' });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const reviewData = req.body;
  try {
    const review = await Review.findByIdAndUpdate(id, reviewData, { new: true });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the review' });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ success: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the review' });
  }
};
