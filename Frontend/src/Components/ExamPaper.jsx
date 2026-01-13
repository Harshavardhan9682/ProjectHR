import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchExamById } from "../slice/examQuestionsSlice";
import { fetchQuestions } from "../slice/addQuestions";
import { submitExam } from "../slice/submitExam";


import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import ExamTimer from "./Duration";
import { useNavigate } from "react-router-dom";
const ExamQuestions = () => {
  const { examId } = useParams();
  const dispatch = useAppDispatch();
const navigate=useNavigate()

  const [ids, setIds] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const { questions } = useAppSelector((state) => state.questions);
  const { data, loading } = useAppSelector(
    (state) => state.examQuestions
  );
  // console.log("questions",questions,data)

  const  examtimer=data.duration
  
  
  useEffect(() => {
    if (examId) {
      dispatch(fetchExamById(examId));
      dispatch(fetchQuestions());
    }
  }, [examId, dispatch]);

  useEffect(() => {
    if (data?.questionIds?.length) {
      setIds(data.questionIds);
    }
  }, [data]);

  /* 3️⃣ filter exam questions */
  useEffect(() => {
    if (ids.length && questions.length) {
      const filtered = questions.filter((q) =>
        ids.includes(q._id)
      );
      console.log("filtered",filtered)
      setMcqs(filtered);
    }
  }, [ids, questions]);

  /* 4️⃣ handle answers */
  const handleAnswerChange = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  /* 5️⃣ submit exam */
const handleSubmitExam = () => {
  const payload = {
    examId,
    answers: Object.entries(selectedAnswers).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    ),
  };

  dispatch(submitExam(payload));
  setSelectedAnswers({});
  navigate("/login");
  localStorage.removeItem("token");
};

const handleTimeUp = () => {
  // if (!mcqs.length) return; // safety guard

  alert("Time is up! Exam submitted.");
  handleSubmitExam();
  navigate("/login")
  localStorage.removeItem("token");
};

// console.log(mcqs)

  if (loading) return <Typography>Loading...</Typography>;

  return (
  <Box
      sx={{
        p: { xs: 1.5, sm: 3 },
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* ⏱ Timer */}
      <ExamTimer duration={examtimer} onTimeUp={handleTimeUp} />

      {/* 📄 Questions */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5, sm: 2 },
          mt: { xs: 2, sm: 3 },
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        {mcqs.map((question, index) => (
          <Card
            key={question._id}
            sx={{
              borderRadius: { xs: "8px", sm: "12px" },
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              {/* ❓ Question */}
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: 1,
                  fontSize: { xs: "15px", sm: "18px" },
                }}
              >
                {index + 1}. {question.questionText}
              </Typography>

              {/* 🔘 Options */}
              <RadioGroup
                value={selectedAnswers[question._id] ?? ""}
                onChange={(e) =>
                  handleAnswerChange(
                    question._id,
                    Number(e.target.value)
                  )
                }
              >
                {question.options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={i}
                    control={<Radio size="small" />}
                    label={`${String.fromCharCode(65 + i)}. ${option}`}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      px: 1.5,
                      py: 0.8,
                      mb: 1,
                      width: "100%",
                      fontSize: { xs: "14px", sm: "16px" },
                      transition: "0.2s",
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* 🟦 Submit Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmitExam}
          disabled={
            mcqs.length === 0 ||
            Object.keys(selectedAnswers).length !== mcqs.length
          }
          sx={{
            px: { xs: 4, sm: 6 },
            py: { xs: 1.2, sm: 1.5 },
            width: { xs: "100%", sm: "auto" },
            maxWidth: "320px",
            borderRadius: "30px",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: 600,
          }}
        >
          Submit Exam
        </Button>
      </Box>
    </Box>

  );
};

export default ExamQuestions;
