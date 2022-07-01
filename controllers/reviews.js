const Spot = require('../models/spot');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    spot.reviews.push(review);
    await review.save();
    await spot.save();
    req.flash('success', 'Your review is sparking!');
    res.redirect(`/spots/${spot._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    Spot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // use $pull https://docs.mongodb.com/manual/reference/operator/update/pull/
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/spots/${id}`);
}