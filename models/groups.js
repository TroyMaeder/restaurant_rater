const mongoose = require('mongoose');
const db = require('../db');

const Group = db.model('Group', new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
}));
