const mongoose = require('mongoose');
const db = require('./db');

const GroupPop = db.model('GroupPop', new mongoose.Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'UserPop' }]
}));

const UserPop = db.model('UserPop', new mongoose.Schema({
  name: String,
  username: String,
  facebookId: String,
  group: { type: Schema.Types.ObjectId, ref: 'GroupPop' },
  reviews: { type: Schema.Types.ObjectId, ref: 'reviewPop' }
}));

const reviewPop = db.model('reviewPop', new mongoose.Schema({
  restaurant_id: mongoose.Schema.ObjectId,
  date: String,
  review: String,
  _creator: { type: Number, ref: 'UserPop' },
}));
