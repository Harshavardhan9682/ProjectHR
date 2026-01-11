const express = require("express");
const submitRoutes= express.Router();
const {submitExam,getExamResult,getExamResults}=require("../controllers/submitData")
const auth=require("../middleware/adminAuth")

submitRoutes.post("/submit",submitExam);
submitRoutes.get("/result/:examId",auth, getExamResult);
submitRoutes.get("/result",auth,getExamResults)


module.exports = submitRoutes;
