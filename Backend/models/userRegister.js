const mongoose = require("mongoose");

const userRegister = new mongoose.Schema({
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
    dateOfReg: {
        type: Date,
        default: Date.now,
      },
});
const userRegisterData = mongoose.model("users", userRegister);
module.exports = userRegisterData;
