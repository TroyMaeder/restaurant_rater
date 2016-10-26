const express = require('express');

const app = express();

const restaurants = require('./default_restaurants');

const mongoose = require('mongoose');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));
app.use(express.static(`${__dirname}/public/js`));

const db = mongoose.connect('mongodb://127.0.0.1:27017/restaurant_rater');


db.connect("mongodb://localhost:27017/restaurant_rater", function(err, db) {
  if(err) {
    return console.dir(err);
  }

  var collection = db.collection('restaurants');

    collection.find().toArray(function(err, kittens) {
        console.log(kittens)
    });
});


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

app.get('/search', (req, res) => {
  if (res.statusCode === 200) {
    res.render('search');
  }
});

app.get('/search/:query', (req, res) => {
  if (res.statusCode === 200) {
    let userInput = req.params.query
    var restaurantResults = retrieveWords(londonRestaurants, userInput);
    res.end(JSON.stringify(restaurantResults));
  }
});

app.listen(8080);
