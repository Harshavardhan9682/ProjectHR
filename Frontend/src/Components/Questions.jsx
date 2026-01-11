import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  fetchQuestions,
  updateQuestion,
  deleteQuestion,
  addQuestions,
} from "../slice/addQuestions";
import { examQuestions } from "../slice/examQuestionsSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CustomDialog from "../custom/customDialog";
import CustomTextField from "../custom/customTextField";
import SearchQuestion from "./Search";

const Questions = () => {
  const dispatch = useAppDispatch();
  const { questions, loading, error } = useAppSelector(
    (state) => state.questions
  );

const [query, setQuery] = useState("");
const [type, setType] = useState("");

useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(fetchQuestions({ query, type }));
  }, 5000);
  return () => clearTimeout(timer);
}, [query, type, dispatch]);


  const [open, setOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);

const [examData, setExamData] = useState({
  title: "",
  description: "",
  duration: "",
  passPercentage: "",
});
  const [editQuestion, setEditQuestion] = useState(null);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    questionText: "",
    options: ["", "", "", ""],
    correctOptionIndex: "",
  });

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  /* ---------------- FORM HANDLERS ---------------- */

  const handleOpenAdd = () => {
    setEditQuestion(null);
    setFormData({
      type: "",
      questionText: "",
      options: ["", "", "", ""],
      correctOptionIndex: "",
    });
    setOpen(true);
  };

  const handleOpenEdit = (question) => {
    setEditQuestion(question);
    setFormData({
      type: question.type || "",
      questionText: question.questionText,
      options: question.options,
      correctOptionIndex: question.correctOptionIndex,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;

    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleSave = () => {
    if (editQuestion) {
      dispatch(updateQuestion({ id: editQuestion._id, data: formData }));
    } else {
      dispatch(addQuestions(formData));
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  

  const handleCheckboxChange = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((qid) => qid !== id)
        : [...prev, id]
    );
  };


  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedQuestions([]);
  };

  const handleExamChange = (field, value) => {
  setExamData((prev) => ({
    ...prev,
    [field]: value,
  }));
};
const handleCreateExam = () => {
  const payload = {
    title: examData.title,
    description: examData.description,
    duration: Number(examData.duration),
    passPercentage: Number(examData.passPercentage),
    noOfQuestions: selectedQuestions.length,
    questionIds: selectedQuestions,
  };
    console.log("FINAL EXAM PAYLOAD:", payload);

  dispatch(examQuestions(payload))

  setExamOpen(false);
  setSelectMode(false);
  setSelectedQuestions([]);
};

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ p: 2 }}>
    
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ fontSize: 18 }}
            onClick={handleOpenAdd}
          >
            +
          </Button>

          <Button
            variant="contained"
            color={selectMode ? "secondary" : "primary"}
            onClick={toggleSelectMode}
          >
            {selectMode ? "Cancel Selection" : "Select Questions"}
          </Button>
        </Stack>

        <SearchQuestion
  query={query}
  setQuery={setQuery}
  type={type}
  setType={setType}
/>

      </Box>


    <Box
  sx={{
    margin: "40px",
    position: "relative",
    paddingBottom: "80px", // space for button
  }}
>
  {/* QUESTIONS LIST */}
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {Array.isArray(questions) &&
      questions.map((question, qIndex) => (
        <Card key={question._id || qIndex}>
          {selectMode && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pr: 2,
              }}
            >
              <Checkbox
                checked={selectedQuestions.includes(question._id)}
                onChange={() => handleCheckboxChange(question._id)}
              />
            </Box>
          )}

          <CardContent>
            <Typography variant="h6">
              {qIndex + 1}. {question.questionText}
            </Typography>

            {question.options.map((option, optIndex) => (
              <Typography
                key={optIndex}
                sx={{
                  ml: 2,
                  fontWeight:
                    optIndex === question.correctOptionIndex
                      ? "bold"
                      : "normal",
                  color:
                    optIndex === question.correctOptionIndex
                      ? "green"
                      : "text.primary",
                }}
              >
                {String.fromCharCode(65 + optIndex)}. {option}
              </Typography>
            ))}

            {!selectMode && (
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleOpenEdit(question)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(question._id)}
                >
                  Delete
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      ))}
  </Box>

  {/* CREATE EXAM BUTTON — INSIDE SAME CONTAINER */}
  {selectMode && (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        mt: 3,
        backgroundColor: "#fff",
        py: 2,
        textAlign: "center",
      }}
    >
      <Button
        variant="contained"
        color="success"
        disabled={selectedQuestions.length < 20}
        onClick={() => setExamOpen(true)}
      >
        Create Exam Paper ({selectedQuestions.length})
      </Button>
    </Box>
  )}
</Box>


    
      <CustomDialog
  open={examOpen}
  onClose={() => setExamOpen(false)}
  onSave={handleCreateExam}
  title="Create Exam Paper"
>
  <CustomTextField
    label="Title"
    value={examData.title}
    onChange={(val) => handleExamChange("title", val)}
  />

  <CustomTextField
    label="Description"
    value={examData.description}
    onChange={(val) => handleExamChange("description", val)}
  />

  <CustomTextField
    label="Duration (minutes)"
    value={examData.duration}
    onChange={(val) => handleExamChange("duration", val)}
  />

  <CustomTextField
    label="Pass Percentage"
    value={examData.passPercentage}
    onChange={(val) => handleExamChange("passPercentage", val)}
  />

  <CustomTextField
    label="Number of Questions"
    value={selectedQuestions.length}
    onChange={() => {}}
    disabled
  />
</CustomDialog>


    
      <CustomDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        title={editQuestion ? "Edit Question" : "Add Question"}
      >
        <CustomTextField
          label="Type"
          value={formData.type}
          onChange={(val) => handleChange("type", val)}
        />

        <CustomTextField
          label="Question"
          value={formData.questionText}
          onChange={(val) => handleChange("questionText", val)}
        />

        {formData.options.map((opt, idx) => (
          <CustomTextField
            key={idx}
            label={`Option ${String.fromCharCode(65 + idx)}`}
            value={opt}
            onChange={(val) => handleOptionChange(idx, val)}
          />
        ))}

        <FormControl fullWidth margin="normal">
          <InputLabel>Correct Option</InputLabel>
          <Select
            value={formData.correctOptionIndex}
            label="Correct Option"
            onChange={(e) =>
              handleChange("correctOptionIndex", e.target.value)
            }
          >
            <MenuItem value={0}>A</MenuItem>
            <MenuItem value={1}>B</MenuItem>
            <MenuItem value={2}>C</MenuItem>
            <MenuItem value={3}>D</MenuItem>
          </Select>
        </FormControl>
      </CustomDialog>
    </Box>
  );
};

export default Questions;
