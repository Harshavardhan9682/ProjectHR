const ExamSession = require("../models/submitData");
const Question = require("../models/questionSchema");
const Test = require("../models/testSchema");

exports.submitExam = async (req, res) => {
  console.log("submitExam running");

  try {
    const { examId, answers } = req.body;

    if (!examId || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const exam = await Test.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    let score = 0;

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (
        question &&
        question.correctOptionIndex === ans.selectedOption
      ) {
        score++;
      }
    }

    const percentage = Math.round((score / answers.length) * 100);
    const passed = percentage >= exam.passPercentage;

    const session = await ExamSession.findOneAndUpdate(
      { examId },
      {
        $push: {
          submissions: {
            answers,
            score,
            percentage,
            passed,
          },
        },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Exam submitted successfully",
      score,
      percentage,
      passed,
      totalUsers: session.submissions.length,
    });

  } catch (error) {
    console.error("Submit Exam Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.getExamResults=async(req,res)=>{
  try{
    const result = await ExamSession.find()
    res.status(200).json({message:"successfully ",
      result:result
    })

  }

   catch(error){
    
   res.status(500).json({ message: error.message });
  }
}




exports.getExamResult = async (req, res) => {
  try {
    const { examId } = req.params;
  

    const results = await ExamSession.find({ examId:examId });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(results);
  } catch (error) {
    console.error("Get Exam Result Error:", error);
    res.status(500).json({ message: error.message });
  }
};