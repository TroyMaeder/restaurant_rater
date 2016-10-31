const mongoose = require('mongoose');

const connRestaurantRater = mongoose.createConnection('mongodb://localhost/restaurant_rater');

const Restaurant = connRestaurantRater.model('Restaurant', new mongoose.Schema({
  restaurant: {
    name: String,
  },
}));

exports.findRestaurant = function(userInput, callback) {
  const userInputRegEx = new RegExp(userInput, 'i');

  Restaurant.find({ 'restaurant.name': userInputRegEx }, { 'restaurant.name': 1, 'restaurant._id': 1 },
  (err, restaurants) => {
    callback(err, restaurants);
  });
};
