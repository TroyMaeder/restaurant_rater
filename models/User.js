const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  facebookId: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
});

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

userSchema.statics.findOrCreate = function(facebookProfile, cb) {
  return this.findOne({ facebookId: facebookProfile.id }, (err, userRetrievedFromDb) => {
    if (err) {
      return cb(err);
    }

    if (userRetrievedFromDb) {
      return cb(null, userRetrievedFromDb);
    }

    const newUser = new this({
      name: facebookProfile.displayName,
      username: facebookProfile.username,
      facebookId: facebookProfile.id,
    });

    newUser.save((error, user) => {
      if (error) {
        return cb(error);
      }

      return cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

User.findOrCreate = (facebookProfile, cb) => {
  User.findOne({ facebookId: facebookProfile.id }, (err, userRetrievedFromDb) => {
    if (err) {
      return cb(err);
    }

    if (userRetrievedFromDb) {
      return cb(null, userRetrievedFromDb);
    }

    const newUser = new User({
      name: facebookProfile.displayName,
      username: facebookProfile.username,
      facebookId: facebookProfile.id,
    });

    newUser.save((error, user) => {
      if (error) {
        return cb(error);
      }

      return cb(null, user);
    });
  });
};

module.exports = User;
