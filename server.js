const express = require('express');

const request = require('request');

const app = express();
const path = require('path');

app.use(express.static(`${__dirname}/public`));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title : 'Home' }
  );
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/frontpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'front_page.html'));
});




app.get('/api', (req, res) => {
  request('https://developers.zomato.com/api/v2.1/restaurant?apikey=39075b374a5c0d9ee98fcc8e52d0a07c', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const jsonObject = JSON.parse(body);
      console.log(jsonObject["photos_url"]);
    }
  })
});

app.listen(8080);
