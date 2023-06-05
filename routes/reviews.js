const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

// GET /reviews
router.get('/', reviewsController.getAllReviews);

// GET /reviews/:id
router.get('/:id', reviewsController.getReviewById);

// POST /reviews
router.post('/', reviewsController.createReview);

// PUT /reviews/:id
router.put('/:id', reviewsController.updateReview);

// DELETE /reviews
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;