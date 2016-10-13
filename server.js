const express = require('express');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));
app.use(express.static(`${__dirname}/public/js`));

const restaurants = [
  {
    name: 'TGI Fridays',
    picture: 'https://b.zmtcdn.com/data/pictures/chains/4/6100234/2c141df6ab0b59ed90a08084264a423b_featured_v2.jpg',
    address: '25-29 Coventry St, London W1D 7AG',
    neighbourhood: 'Covent Garden',
  },
  {
    name: 'Gauchos',
    picture: 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg',
    address: '60A Charlotte St',
    neighbourhood: 'Piccadilly Square',
  },
  {
    name: 'Sushi Samba',
    picture: 'https://b.zmtcdn.com/data/pictures/6/6107336/90de72609f27b3ef482c0afe6dff50b8_featured_v2.jpg',
    address: 'Heron Tower, 110 Bishopsgate',
    neighbourhood: 'City of London',
  },
];

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
    // res.send('I am the server and you are sending...' + req.originalUrl);
    res.render('search');
  }
});

app.get('/search/:query', (req, res) => {
  if (res.statusCode === 200) {
    console.log('asdf', req.params.query);
    res.end();
    // res.send('I am the server and you are sending...' + req.originalUrl);
  }
});

app.listen(8080);
