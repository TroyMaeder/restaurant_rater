const express = require('express');

const request = require('request');

const app = express();

app.use(express.static(`${__dirname}/views`));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/api', (req, res) => {
  request('https://developers.zomato.com/api/v2.1/search?apikey=39075b374a5c0d9ee98fcc8e52d0a07c&q=gauchos', (error, response, body) => {
    request('https://developers.zomato.com/api/v2.1/search?apikey=39075b374a5c0d9ee98fcc8e52d0a07c&q=tgi', (error, response, body1) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body);
        const restaurantImage = json.restaurants[0].restaurant.featured_image;
        const restaurantJPG = `${restaurantImage}`;

        const json1 = JSON.parse(body1);
        const restaurantImage1 = json1.restaurants[0].restaurant.featured_image;
        const restaurantJPG1 = `${restaurantImage1}`;
        res.render('restaurants',
        { title1: restaurantJPG,
          title2: restaurantJPG1
        }
        );
      }
    });
  });
});



app.listen(8080);
