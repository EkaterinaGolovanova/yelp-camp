const express = require('express');
const routes = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

// Post a review 
routes.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// Delete a review
routes.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = routes;