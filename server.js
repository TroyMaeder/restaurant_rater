const express = require('express');
const restaurants = require('./models/restaurants');
const reviews = require('./models/reviews');
const User = require('./models/User');
const group = require('./models/groups');
const defaultRestaurants = require('./default_restaurants');
const FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

require('./db');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/public`));

app.use(session({
  secret: 'Django',
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: '1661396180841330',
  clientSecret: 'a940d0f384bce72c1175fee8abc0797b',
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
},
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate(profile, (err, user) => {
      if (err) {
        return cb(err);
      }
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook', (req, res) => {
  passport.authenticate('facebook', {
    authType: 'reauthenticate',
    state: req.query.group_name,
  })(req, res);
});

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  const groupName = req.query.state;
  const userId = req.user._id;

  if (groupName) {
    group.saveUserToGroup(groupName, userId, (err) => {
      console.log(err);
      // res.redirect('/error');
    });
  }

  res.redirect('/restaurant_page');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/restaurant_page', (req, res) => {
  res.render('restaurant_page',
  { tgi_pic: defaultRestaurants[0].picture,
    tgi: defaultRestaurants[0].name,
    tgi_address: defaultRestaurants[0].address,
    tgi_neighbourhood: defaultRestaurants[0].neighbourhood,
    gauchos_pic: defaultRestaurants[1].picture,
    gauchos: defaultRestaurants[1].name,
    gauchos_address: defaultRestaurants[1].address,
    gauchos_neighbourhood: defaultRestaurants[1].neighbourhood,
    sushi_samba_pic: defaultRestaurants[2].picture,
    sushi_samba: defaultRestaurants[2].name,
    sushi_samba_address: defaultRestaurants[2].address,
    sushi_samba_neighbourhood: defaultRestaurants[2].neighbourhood,
    picture: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAVc4xMroGAOiRjn5-5rJmCdqvzxo73VIU&q=Space+Needle,Seattle+WA',
  });
});

app.get('/search', (req, res) => {
  res.render('search');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/search/:query', (req, res) => {
  const userInput = req.params.query;

  if (userInput.length > 2) {
    restaurants.findRestaurant(userInput, (err, restaurantsData) => {
      res.end(JSON.stringify(restaurantsData));
    });
  }
});

app.get('/review/:restaurantId/:restaurantName', (req, res) => {
  res.render('rate', {
    restaurantId: req.params.restaurantId,
    restaurantName: req.params.restaurantName,
  });
});

app.get('/submit_review/:restaurantId/:restaurantName', (req, res) => {
  const restaurantId = req.params.restaurantId;
  const reviewDate = req.query.date_visited;
  const restaurantReview = req.query.review;
  const restaurantRating = req.query.ratings_five;

  res.render('restaurant_page',
  { tgi_pic: defaultRestaurants[0].picture,
    tgi: defaultRestaurants[0].name,
    tgi_address: defaultRestaurants[0].address,
    tgi_neighbourhood: defaultRestaurants[0].neighbourhood,
    gauchos_pic: defaultRestaurants[1].picture,
    gauchos: defaultRestaurants[1].name,
    gauchos_address: defaultRestaurants[1].address,
    gauchos_neighbourhood: defaultRestaurants[1].neighbourhood,
    sushi_samba_pic: defaultRestaurants[2].picture,
    sushi_samba: defaultRestaurants[2].name,
    sushi_samba_address: defaultRestaurants[2].address,
    sushi_samba_neighbourhood: defaultRestaurants[2].neighbourhood,
  });

  reviews.saveReview(restaurantId, restaurantRating, reviewDate, restaurantReview);
});

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/group', (req, res) => {
  const userId = req.user._id;

  group.findOne({ users: userId }, (err, person) => {
    if (err) {
       console.log(err, 'there is a error inside find one');
    }

    if (person) {
      res.render('invite_friends', {
        groupName: person.name,
      });
    } else {
      res.render('create_group');
    }
  });
});

app.get('/accept_invite', (req, res) => {
  const groupName = req.query.group_name;

  res.render('accept_invite', {
    groupName,
  });
});

app.get('/invite_friends', (req, res) => {
  const groupName = req.query.group_name;
  const userId = req.user._id;

  group.createGroup(groupName, userId);
  res.render('accept_invite');
});

app.listen(8080);
