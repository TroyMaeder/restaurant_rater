const mongoose = require('mongoose');
const db = require('../db');

const Review = db.model('Review', new mongoose.Schema({
  restaurant_id: mongoose.Schema.ObjectId,
  date: String,
  review: String,
}));

exports.saveReview = function(restaurantId, dateVisited, restaurantReview) {
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
