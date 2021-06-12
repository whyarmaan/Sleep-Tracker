const mongoose = require("mongoose");

const SleepSchema = mongoose.Schema({
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  duration: {
    type: Number,
  }, 
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  } 
});

const sleepModel = mongoose.model("sleeps", SleepSchema);
module.exports = sleepModel;

