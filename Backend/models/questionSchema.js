const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },

  options: {
    type: [String],
    validate: [(arr) => arr.length >= 2, "At least 2 options required"],
  },
  correctOptionIndex: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const questionData = mongoose.model("questions", questionSchema);
module.exports = questionData;
