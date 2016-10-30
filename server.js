const express = require('express');
const restaurants = require('./models/restaurants');

const app = express();

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

// const connGroupRestaurans = conn_restaurant_rater.model('GroupRestaurant', new mongoose.Schema({
//   restaurant: {
//     name: String,
//   },
// }));

// var rest = new Restaurant({ 'restaurant.name': "Troy's Super Deli" });
// rest.save();

app.get('/search', (req, res) => {
  if (res.statusCode === 200) {
    res.render('search');
  }
});

app.get('/search/:query', (req, res) => {
  let userInput = req.params.query;

  if (userInput.length > 2) {
    restaurants.findRestaurant(userInput, function(err, restaurants) {
      res.end(JSON.stringify(restaurants));
    });
  }
});

app.listen(8080);
