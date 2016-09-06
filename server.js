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
    request('https://developers.zomato.com/api/v2.1/search?apikey=39075b374a5c0d9ee98fcc8e52d0a07c&q=tgi', (err, respon, body1) => {
      if (!error && response.statusCode === 200) {
        const json = JSON.parse(body);
        const name = 'Gaucho';
        const restaurantJPG = 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg';
        const restaurantJPG1 = 'https://b.zmtcdn.com/data/pictures/chains/4/6100234/2c141df6ab0b59ed90a08084264a423b_featured_v2.jpg';
        res.render('restaurants',
        { title1: restaurantJPG,
          title2: restaurantJPG1,
          title_name: name
        });
      }
    });
  });
});
app.listen(8080);
