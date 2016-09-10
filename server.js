const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/views`));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('login');
});

const restaurants = [
  {
    name: 'TGI Fridays',
    picture: 'https://b.zmtcdn.com/data/pictures/chains/4/6100234/2c141df6ab0b59ed90a08084264a423b_featured_v2.jpg',
  },
];

app.get('/api', (req, res) => {
  if (res.statusCode === 200) {
    res.render('restaurants',
      { picture: restaurants[0].picture,
        name: restaurants[0].name,
    });
  }
});

app.listen(8080);
