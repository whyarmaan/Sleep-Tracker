const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  id: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  sleeps: [{
    type: mongoose.Types.ObjectId,
    ref: 'sleeps'
  }]
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
