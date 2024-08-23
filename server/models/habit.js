const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  label: {
    type: String,
    required: false,
  },
  days: {
    type: Array,
    required: false,
  },
  completed: {
    type: [String],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("Habit", habitSchema);
