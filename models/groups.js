const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
});

groupSchema.statics.createGroup = (groupName, userId) => {

  const newGroup = new Group({
    name: groupName,
    users: [userId]
  });

  newGroup.save((err, group) => {
    if (err) {
      return console.error(err);
    }
  });
};

//TODO make it so you add group with id not name
//TODO make it so there's no duplicates

groupSchema.statics.saveUserToGroup = (groupName, userId, callback) => {
  Group.findOne({name: groupName}, function(err, group) {
    if (err) {
      callback(err);
    } else {
      group.users.push(userId);
      group.save();
    }
  });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
