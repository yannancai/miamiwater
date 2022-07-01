const express = require('express')
const router = express.Router({ mergeParams: true }) // such param is needed for accessing id in the prefix route
const { isReviewAuthor, isLoggedIn } = require('../middleware');

const Spot = require('../models/spot');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

// create review
router.post('/', isLoggedIn, catchAsync(reviews.createReview));

//delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;