const express = require('express');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('restaurant_page');
});

// const restaurants = [
//   {
//     name: 'TGI Fridays',
//     picture: 'https://b.zmtcdn.com/data/pictures/chains/4/6100234/2c141df6ab0b59ed90a08084264a423b_featured_v2.jpg',
//   },
//   {
//     name: 'Gauchos',
//     picture: 'https://b.zmtcdn.com/data/pictures/chains/0/6100580/5f113fc379bf1daf5e57f60ca65e7d35_featured_v2.jpg',
//   },
// ];
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
