app.get('/api', (req, res) => {
  apiRequest('https://developers.zomato.com/api/v2.1/search?apikey=39075b374a5c0d9ee98fcc8e52d0a07c&q=gauchos');
});

function apiRequest(api, req, res) {
  request(api, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const restaurantImage = JSON.parse(body.restaurants[0].restaurant.featured_image);
      const restaurantName = JSON.parse(body.restaurants[0].restaurant.name);
      res.render('restaurants',
        { title: restaurantImage }
      );
    }
  });
}

// app.get('/api', (req, res) => {
//   request(apiCall, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       const json = JSON.parse(body);
//       const restaurantImage = json.restaurants[0].restaurant.featured_image;
//       const restaurantJPG = `'${restaurantImage}'`;
//       console.log(restaurantJPG);
//       res.render('restaurants',
//       { title: restaurantImage}
//       );
//     }
//   });
// });
