const express = require('express');
const restaurants = require('./models/restaurants');
// const reviews = require('./models/reviews');
const defaultRestaurants = require('./default_restaurants');
const mongoose = require('mongoose');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));
app.use(express.static(`${__dirname}/public/js`));

const connRestaurantReviews = mongoose.createConnection('mongodb://localhost/reviews');

const Review = connRestaurantReviews.model('Review', new mongoose.Schema({
  review: {
    restaurant_id: Number,
    date: String,
    review: String,
    name: String,
  },
}));

app.get('/', (req, res) => {
  res.render('restaurant_page',
  { tgi_pic: defaultRestaurants[0].picture,
    tgi: defaultRestaurants[0].name,
    tgi_address: defaultRestaurants[0].address,
    tgi_neighbourhood: defaultRestaurants[0].neighbourhood,
    gauchos_pic: defaultRestaurants[1].picture,
    gauchos: defaultRestaurants[1].name,
    gauchos_address: defaultRestaurants[1].address,
    gauchos_neighbourhood: defaultRestaurants[1].neighbourhood,
    sushi_samba_pic: defaultRestaurants[2].picture,
    sushi_samba: defaultRestaurants[2].name,
    sushi_samba_address: defaultRestaurants[2].address,
    sushi_samba_neighbourhood: defaultRestaurants[2].neighbourhood,
  });
});

// const connGroupRestaurans = conn_restaurant_rater.model('GroupRestaurant', new mongoose.Schema({
//   restaurant: {
//     name: String,
//   },
// }));

// var rest = new Restaurant({ 'restaurant.name': "Troy's Super Deli" });
// rest.save();

app.get('/search', (req, res) => {
  res.render('search');
});

app.get('/search/:query', (req, res) => {
  const userInput = req.params.query;

  if (userInput.length > 2) {
    restaurants.findRestaurant(userInput, (err, restaurantsData) => {
      res.end(JSON.stringify(restaurantsData));
    });
  }
});

app.get('/review/:restaurantId/:restaurantName', (req, res) => {
  res.render('rate', {
    restaurantId: req.params.restaurantId,
    restaurantName: req.params.restaurantName,
  });
});

app.get('/submit_review/:restaurantId/:restaurantName', (req, res) => {
  const restaurantId = req.params.restaurantId;
  let restaurantName = req.params.restaurantName;
  const reviewDate = req.query.date_visited;
  const restaurantReview = req.query.review;

  res.render('restaurant_page',
  { tgi_pic: defaultRestaurants[0].picture,
    tgi: defaultRestaurants[0].name,
    tgi_address: defaultRestaurants[0].address,
    tgi_neighbourhood: defaultRestaurants[0].neighbourhood,
    gauchos_pic: defaultRestaurants[1].picture,
    gauchos: defaultRestaurants[1].name,
    gauchos_address: defaultRestaurants[1].address,
    gauchos_neighbourhood: defaultRestaurants[1].neighbourhood,
    sushi_samba_pic: defaultRestaurants[2].picture,
    sushi_samba: defaultRestaurants[2].name,
    sushi_samba_address: defaultRestaurants[2].address,
    sushi_samba_neighbourhood: defaultRestaurants[2].neighbourhood,
  });


saveReview = function(restaurantName1, restaurantId, dateVisited, restaurantReview) {
  restaurantName1 = new Review({
    'restaurant_id': restaurantId, 'review.date': dateVisited,
    'restaurant_review': restaurantReview, 'restaurantName': restaurantName,
  });

  restaurantName1.save(function (err, restaurant) {
    if (err) {
      return console.error(err);
    }
      console.log(restaurantName1 + ' is saved!');
  });
};

saveReview(restaurantName, restaurantId, reviewDate, restaurantReview)


  // TODO insert the data into the DB
  /*
  [wdcollection called `restaurants`
  when you insert into restaurants... an _id for that entry (RESTAURANT) gets generated

  called called `reviews`
  when you insert... an _id for the REVIEW will get generated
    ... but part of a review is a REFERENCE to the restaurant being reviewewd
    What's the ref? You could mention the restaurant by name, by address... but that's shit. Use the ID


  */
  // TODO redirect somewhere else
});

app.listen(8080);
