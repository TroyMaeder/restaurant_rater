const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/views`));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('login');
});

const arr = [{n: 6} , {n: 4} , {n:9}]

const restaurants = [
  {
    name: 'TGI Fridays',
    picture: 'https://b.zmtcdn.com/data/pictures/chains/4/6100234/2c141df6ab0b59ed90a08084264a423b_featured_v2.jpg',
  },
  {
];

const restaurants2 = [
  {
    name: 'Gauchos',
    picture: 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg',
  },
];

const restaurants3 = [
  {
    name: 'Gauchos',
    picture: 'https://b.zmtcdn.com/data/pictures/chains/0/6106690/dcf06d2fdf9be5d36ccd3379e82df3e9_featured_v2.JPG',
  },
];

app.get('/restaurants', (req, res) => {
  if (res.statusCode === 200) {
    res.render('restaurants',
      { picture: restaurants[0].picture,
        name: restaurants[0].name,
        picture2: restaurants2[0].picture ,
        name2: restaurants[0].name,
        picture3: restaurants3[0].picture ,
        name3: restaurants3[0].name,
    });
  }
});

app.get('/restaurant', (req, res) => {
  if (res.statusCode === 200) {
    res.render('restaurants',
      { picture: restaurants[0].picture,
        name: restaurants[0].name,
        pictureTwo: restaurants[0].picture
    });
  }
});

app.listen(8080);
