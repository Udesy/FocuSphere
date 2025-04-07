const mongoose = require("mongoose");

const FocusSessionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  focusTime: Number, // in minutes
  breaksTaken: Number,
});

module.exports = mongoose.model("FocusSession", FocusSessionSchema);
