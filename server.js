const express = require('express');

const app = express();

const restaurants = require('./default_restaurants');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurant_rater');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));
app.use(express.static(`${__dirname}/public/js`));

app.get('/', (req, res) => {
  if (res.statusCode === 200) {
    res.render('restaurant_page',
    { tgi_pic: restaurants[0].picture,
      tgi: restaurants[0].name,
      tgi_address: restaurants[0].address,
      tgi_neighbourhood: restaurants[0].neighbourhood,
      gauchos_pic: restaurants[1].picture,
      gauchos: restaurants[1].name,
      gauchos_address: restaurants[1].address,
      gauchos_neighbourhood: restaurants[1].neighbourhood,
      sushi_samba_pic: restaurants[2].picture,
      sushi_samba: restaurants[2].name,
      sushi_samba_address: restaurants[2].address,
      sushi_samba_neighbourhood: restaurants[2].neighbourhood,
    });
  }
});

const Schema = mongoose.Schema;
const restaurantSchema = new Schema({
  restaurant: {
    name: String,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// var rest = new Restaurant({ 'restaurant.name': "Troy's Super Deli" });
// rest.save();

app.get('/search', (req, res) => {
  if (res.statusCode === 200) {
    res.render('search');
  }
});

const restaurantResults = [];

app.get('/search/:query', (req, res) => {
  if (res.statusCode === 200) {
    const userInput = `.*${req.params.query}.*`;
    const userInputRegEx = new RegExp(userInput, 'i');

    Restaurant.find({ 'restaurant.name': userInputRegEx }, { 'restaurant.name': 1 },
    (err, restaurant) => {
      if (err) throw err;
      restaurantResults.push(restaurant[0].restaurant.name);
    });

    res.end(JSON.stringify(restaurantResults));
  }
});

app.listen(8080);
