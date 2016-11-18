const mongoose = require('mongoose');

const userReview = new mongoose.Schema({
  restaurant_id: mongoose.Schema.ObjectId,
  rating: Number,
  date: String, 
  review: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userReview.statics.saveReview = (restaurantId, dateVisited, restaurantReview) => {
  const review = new Review({
    restaurant_id: restaurantId,
    date: dateVisited,
    review: restaurantReview,
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
