const express = require('express');
const restaurants = require('./models/restaurants');
const defaultRestaurants = require('./default_restaurants');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));
app.use(express.static(`${__dirname}/public/js`));

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
      // console.log(restaurantsData);
      res.end(JSON.stringify(restaurantsData));
    });
  }
});

app.get('/review/:restaurantId', (req, res) => {
  res.send('you said: ' + req.params.restaurantId);
  // TODO res.render the template
  /*
  READ UP ON FORMS
  <form action="/submit_review/$$$" method="post">
    <input type="hidden" name="rating">
    <input type="" name="month_visited">
  </form>
   */
  // TODO part of the information that this form sends to the next end-point, is the restaurantId
});

app.post('/submit_review/:restaurantId', (req, res) => {
  // TODO insert the data into the DB
  // TODO redirect somewhere else
});

app.listen(8080);
