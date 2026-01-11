import "./App.css";
import { Routes, Route } from "react-router-dom";
import Users from "./Components/User/UserData";
import Login from "./Components/User/UserLogin"
import CreateQuestions from "./Components/createQuestions";
import ExamQuestions from "./Components/ExamPaper";
import Questions from "./Components/Questions";
import ResultPage from "./Components/Result";
import AdminDashboard from "./components/AdminDashboard";
import ExamPaperList from "./Components/ExamPapers";
import ExamResultCards from "./Components/ResultList";
import UserRegister from "./Components/User/UserRegister";
import AdminLogin from "./Components/AdminLogin";

function App() {
  return (
    <Routes>
      
      <Route path="/Users" element={<Users />} />
      <Route path="/" element={<AdminLogin />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/examPapers" element={<ExamPaperList />} />
      <Route path="/exam/:examId" element={<ExamQuestions />} />
      <Route path="/selectQuestions" element={<Questions />} />
      <Route path="/create" element={<CreateQuestions />} /> 
      <Route path="/result" element ={<ExamResultCards />} />
      <Route path="/result/:examId" element={<ResultPage />} />
      <Route path="/UserRegister" element={<UserRegister />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
