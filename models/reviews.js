const mongoose = require('mongoose');

const connRestaurantReviews = mongoose.createConnection('mongodb://localhost/reviews');

const Review = connRestaurantReviews.model('Review', new mongoose.Schema({
  review: {
    restaurant_id: Number,
    date: String,
    review: String,
  },
}));


const sushi_samba = new Review({ 'review.date': 'October' });

sushi_samba.save(function (err, restaurant) {
  if (err) {
    return console.error(err);
  }
    console.log(restaurant + ' is saved!');
});

// exports.saveReview = function(restaurant) {
//   restaurant.save(function (err, restaurant) {
//     if (err) {
//       return console.error(err);
//     }
//       console.log(restaurant + ' is saved!');
//   });
// };
