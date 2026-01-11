const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  passPercentage: {
    type: Number,
    required: true,
  },
  noOfQuestions:{
    type:Number,
    required:true,

  },
  questionIds:{
    type: [String],
    validate: [(arr) => arr.length >= 20, "At least 20 questions required"],
  }
});

module.exports = mongoose.model("Test", testSchema);
