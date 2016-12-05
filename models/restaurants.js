const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurant: {
    name: String,
    url: String,
    thumb: String,
    location: {
      address: String,
      locality: String,
    },
  },
});

restaurantSchema.statics.findRestaurant = function(userInput, callback) {
  const userInputRegEx = new RegExp(userInput, 'i');

  Restaurant.find({ 'restaurant.name': userInputRegEx }, { 'restaurant.name': 1, 'restaurant._id': 1 },
  (err, restaurants) => {
    console.log(restaurants);
    callback(err, restaurants);
  });
};

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
