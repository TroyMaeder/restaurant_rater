const express = require('express');

const request = require('request');

const app = express();

app.use(express.static(`${__dirname}/views`));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api', (req, res) => {
  res.render('restaurants', {
    //hardcoded
    restaurants: [
      {
        name: 'Gauchos',
        image: 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg'
      },
      {
        name: "McDonald's",
        image: '',
      }
    ]
    title1: 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg',
    title2: 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg'
  });
  // request('https://developers.zomato.com/api/v2.1/search?apikey=39075b374a5c0d9ee98fcc8e52d0a07c&q=gauchos', (error, response, body) => {
  //   request('https://developers.zomato.com/api/v2.1/search?apikey=39075b374a5c0d9ee98fcc8e52d0a07c&q=tgi', (err, respon, body1) => {
  //     if (!error && response.statusCode === 200) {
  //       const json = JSON.parse(body);
  //       const restaurantImage = json.restaurants[0].restaurant.featured_image;
  //       const restaurantName = json.restaurants[0].restaurant.name;
  //       const restaurantJPG = `${restaurantImage}`;
  //
  //       const json1 = JSON.parse(body1);
  //       const restaurantImage1 = json1.restaurants[0].restaurant.featured_image;
  //       const restaurantJPG1 = `${restaurantImage1}`;
  //       console.log(restaurantJPG1)
  //       res.render('restaurants',
  //       { title1: restaurantJPG,
  //         title2: restaurantJPG1
  //       }
  //       );
  //     }
  //   });
  // });
});



app.listen(8080);
