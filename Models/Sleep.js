const mongoose = require("mongoose");

const SleepSchema = mongoose.Schema({
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  } 
});

const sleepModel = mongoose.model("sleep", SleepSchema);
module.exports = sleepModel;

