const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(`${__dirname}/public`));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/frontpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(8080);
