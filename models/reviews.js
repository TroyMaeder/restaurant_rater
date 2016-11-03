const mongoose = require('mongoose');

const connRestaurantReviews = mongoose.createConnection('mongodb://localhost/reviews');

const Review = connRestaurantReviews.model('Review', new mongoose.Schema({
  review: {
    restaurant_id: mongoose.Schema.ObjectId,
    date: String,
    review: String,
  },
}));


exports.saveReview = function(restaurantId, dateVisited, restaurantReview) {
  const review = new Review({
    review: {
      restaurant_id: restaurantId,
      date: dateVisited,
      review: restaurantReview,
    },
  });

  review.save((err, restaurant) => {
    if (err) {
      return console.error(err);
    }
    console.log(restaurant, ' is saved!');
  });
};
