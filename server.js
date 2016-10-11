const express = require('express');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public/css`));

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
    });
  }
});

//
// app.get('/restaurants', (req, res) => {
//   if (res.statusCode === 200) {
//     res.render('restaurants',
//       { picture: restaurants[0].picture,
//         name: restaurants[0].name,
//         picture2: restaurants[1].picture,
//         name2: restaurants[1].name,
//     });
//   }
// });
//
// app.get('/restaurant', (req, res) => {
//   if (res.statusCode === 200) {
//     res.render('restaurants',
//       { picture: restaurants[0].picture,
//         name: restaurants[0].name,
//     });
//   }
// });

app.listen(8080);
