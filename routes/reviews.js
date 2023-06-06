const express = require('express');
const reviewsRouter = express.Router();
const { Review } = require('../models/Reviews');
// Get all reviews
reviewsRouter.get('/', async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.render('reviews', { reviews }); //
    } catch (error) {
        console.error('Error details:', error.message);
        res.status(500).send('Error occurred while fetching reviews');
    }
});

// Delete a review
reviewsRouter.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndRemove(req.params.id);
        res.redirect('/reviews');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while deleting review');
    }
});

module.exports = reviewsRouter;
