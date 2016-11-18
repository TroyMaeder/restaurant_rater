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
    console.log(group, ' is saved!');
  });
};

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
