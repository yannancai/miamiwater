const express = require('express')
const router = express.Router()
const spots = require('../controllers/spots');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');
const Spot = require('../models/spot');

//routing
router.route('/')
    .get(catchAsync(spots.index))
    .post(isLoggedIn, catchAsync(spots.createSpot));

router.get('/new', isLoggedIn, spots.renderNewForm);

router.route('/:id')
    .get(catchAsync(spots.showSpot))
    .put(isLoggedIn, isAuthor, catchAsync(spots.updateSpot))
    .delete(isLoggedIn, isAuthor, catchAsync(spots.deleteSpot));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm));

module.exports = router;