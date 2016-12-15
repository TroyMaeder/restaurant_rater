const express = require('express');
const Restaurant = require('./models/restaurants');
const Review = require('./models/reviews');
const User = require('./models/User');
const Group = require('./models/groups');
const defaultRestaurants = require('./default_restaurants');
const FacebookStrategy = require('passport-facebook');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const unique = require('array-unique');

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
    state: req.query.group_id,
  })(req, res);
});

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login' }), (req, res) => {
    const groupId = req.query.state;
    const userId = req.user._id;

    if (groupId) {
     Group.saveUserToGroup(groupId, userId, (err) => {
       console.log(err);
     });
   }

   res.redirect('/restaurant_page');
 });

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

app.get('/restaurant_reviews/:restaurantId', (req, res) => {
  const userId = req.user._id;
  const restaurantId = req.params.restaurantId;

  Group.findOne({ users: { $in: [userId] } }, (err, group) => {
    for (var i = 0; i < group.users.length; i++) {
      Review.find({users: group.users[i], restaurant_id: restaurantId }, (err, user) => {
      });
    }
  });

  res.render('restaurant_reviews');
});

app.get('/restaurant_page', (req, res) => {
  const userId = req.user._id;
  const restaurantIds = [];

  Group.findOne({ users: { $in: [userId] } }, (err, group) => {
    Review.find({ users: { $in: group.users } }, (error, reviews) => {
      if (reviews.length === 0) {
        return res.render('default_restaurants', {
          tgi_pic: defaultRestaurants[0].picture,
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
      }
      for (let i = 0; i < reviews.length; i++) {
        restaurantIds.push(reviews[i].restaurant_id.toString());
      }
      unique(restaurantIds);
      Restaurant.find({ _id: { $in: restaurantIds } }, (errors, restaurants) => {
        res.render('restaurant_page', {
          restaurants,
        });
      });
    });
  });
});

app.get('/default_restaurants', (req, res) => {
  res.render('default_restaurants', {
    tgi_pic: defaultRestaurants[0].picture,
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

app.get('/search/:query', (req, res) => {
  const userInput = req.params.query;

  if (userInput.length > 2) {
    Restaurant.findRestaurant(userInput, (err, restaurantsData) => {
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
  const userId = req.user._id;

  res.render('default_restaurants',
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

  Review.saveReview(restaurantId, restaurantRating, reviewDate, restaurantReview, userId);
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/group', (req, res) => {
  const userId = req.user._id;

  Group.findOne({ users: userId }, (err, usersGroup) => {
    if (err) {
       console.log(err, 'there is a error inside findOne');
    }

    if (usersGroup) {
      res.render('invite_friends', {
        groupName: usersGroup.name,
        groupObjectId: usersGroup._id,
      });
    } else {
      res.render('group', {
        userId,
      });
    }
  });
});

app.get('/save_group', (req, res) => {
  const groupName = req.query.group_name;
  const userId = req.user._id;

  Group.createGroup(groupName, userId);

  return res.redirect('/group');
});

app.get('/invite_friends', (req, res) => {
  res.render('invite_friends', {
  });
});

app.get('/accept_invite', (req, res) => {
  const groupObjectId = req.query.group_id;

  res.render('accept_invite', {
    groupObjectId,
  });
});

app.listen(8080);
