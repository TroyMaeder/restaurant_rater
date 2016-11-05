const db = require('../db');
const mongoose = require('mongoose');

const Restaurant = db.model('Restaurant', new mongoose.Schema({
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
