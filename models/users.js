const mongoose = require('mongoose');
const db = require('../db');

const User = db.model('User', new mongoose.Schema({
  name: String,
  username: String,
  facebookId: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
}));

/*
{ id: '1453603634654104',
 username: undefined,
 displayName: 'Diana Berce',
 name:
  { familyName: undefined,
    givenName: undefined,
    middleName: undefined },
 gender: undefined,
 profileUrl: undefined,
 provider: 'facebook',
 _raw: '{"name":"Diana Berce","id":"1453603634654104"}',
 _json: { name: 'Diana Berce', id: '1453603634654104' } }
*/

exports.findOrCreate = function(facebookProfile, cb) {
  User.findOne({ facebookId: facebookProfile.id }, function(err, userRetrievedFromDb) {
    if (err) {
      return cb(err);
    }

    if (userRetrievedFromDb) {
      console.log(userRetrievedFromDb);
      return cb(null, userRetrievedFromDb);
    }

    const newUser = new User({
      name: facebookProfile.displayName,
      username: facebookProfile.username,
      facebookId: facebookProfile.id,
    });

    newUser.save(function(err, user) {
      if (err) {
        return cb(err);
      }

      return cb(null, user);
    });
  });
};
