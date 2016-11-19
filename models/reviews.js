const mongoose = require('mongoose');

const userReview = new mongoose.Schema({
  restaurant_id: mongoose.Schema.ObjectId,
  rating: String,
  date: String, 
  review: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userReview.statics.saveReview = (restaurantId, restaurantRating, dateVisited, restaurantReview, userId) => {
  const review = new Review({
    restaurant_id: restaurantId,
    rating: restaurantRating,
    date: dateVisited,
    review: restaurantReview,
    users: [userId],
  });

  review.save((err, restaurant) => {
    if (err) {
      return console.error(err);
    }
    console.log(restaurant, ' is saved!');
  });
};

const Review = mongoose.model('Review', userReview);

module.exports = Review;
