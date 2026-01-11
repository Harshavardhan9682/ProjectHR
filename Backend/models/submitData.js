
const mongoose = require("mongoose");

const examSessionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
    unique: true,
  },
  submissions: [
    {
      // userId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },

      answers: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
          },
          selectedOption: Number,
        },
      ],

      score: Number,
      percentage: Number,
      passed: Boolean,
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("ExamSession", examSessionSchema);
