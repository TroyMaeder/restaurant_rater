const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
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

groupSchema.statics.saveUserToGroup = (groupId, userId, callback) => {
  Group.findOne({_id: groupId}, (err, group) => {
    if (err) {
      callback(err);
    } else {
      group.users.addToSet(userId);
      group.save();
    }
  });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
