const mongoose = require("mongoose");

const userRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Active", "inActive"],
    default: "Active",
  },

  count: {
    type: Number,
    default: 0,
  },

  
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam", 
  },

  dateOfReg: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userRegisterSchema);
module.exports = User;
