const questionsData = require("../models/questionSchema");

exports.addQuestions = async (req, res) => {
  try {
    const {
      type,
      
      questionText,
      options,
      correctOptionIndex,
    } = req.body;

    
    if (
      !type ||
      !questionText ||
      !options ||
      correctOptionIndex === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newQuestion = new questionsData({
      type,
      questionText,
      options,
      correctOptionIndex,
    });

    const savedData = await newQuestion.save();
    res
      .status(201)
      .json({ message: "successfully created question", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getQuestions = async (req, res) => {
  try {
    const { query, type } = req.query;

    const filter = {};

    if (query && query.trim() !== "") {
      filter.questionText = {
        $regex: query,
        $options: "i",
      };
    }

    if (type && type.trim() !== "") {
      filter.type = type;
    }

    const questions = await questionsData.find(filter);

    res.status(200).json({
      message: "Questions fetched successfully",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getQuestionByType = async (req, res) => {
  try {
    const type = req.params.type;

    const typeData = await questionsData.find({ type: type });
    res.status(200).json({ message: "success", data: typeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const updateQuestion = await questionsData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "successfully updated", data: updateQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteQuestion = await questionsData.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "question successfully deleted", data: deleteQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



