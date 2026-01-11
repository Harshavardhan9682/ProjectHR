import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import questionsRender from "../slice/addQuestions"
import examQuestionsRender from "../slice/examQuestionsSlice";
import submitExamRender from "../slice/submitExam"
import userRender from "../slice/userSlice"
const store = configureStore({
  reducer: {
   questions:questionsRender,
   examQuestions:examQuestionsRender,
   submit:submitExamRender,
   user:userRender
  },
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;