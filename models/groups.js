// const mongoose = require('mongoose');
// const db = require('../db');
//
// const Group = db.model('Group', new mongoose.Schema({
//   name: String,
//   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
// }));
//
// exports.createGroup = (groupName, userId) => {
//   const newGroup = new Group({
//     name: groupName,
//     users: [userId],
//   });
//
//   newGroup.save((err, group) => {
//     if (err) {
//       return console.error(err);
//     }
//
//     console.log(group, ' is saved!');
//   });
// };
