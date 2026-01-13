const express = require("express");
const questionsRoutes = express.Router();
const auth = require("../middleware/adminAuth");
const {
  addQuestions,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionByType,
} = require("../controllers/addQuestions");

questionsRoutes.post("/add",auth,addQuestions);
questionsRoutes.get("/",getQuestions);
questionsRoutes.put("/:id",auth, updateQuestion);
questionsRoutes.delete("/:id",auth, deleteQuestion);
questionsRoutes.get("/:type",auth, getQuestionByType);

module.exports = questionsRoutes;
