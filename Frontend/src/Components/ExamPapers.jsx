


import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  fetchExamQuestions,
  fetchExamById,
} from "../slice/examQuestionsSlice";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

const ExamPaperList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const currentUser = state?.currentUser;

  const { data, loading, error } = useAppSelector(
    (state) => state.examQuestions
  );

  
  useEffect(() => {
    if (currentUser?.examId) {
      dispatch(fetchExamById(currentUser.examId));
    } else {
      dispatch(fetchExamQuestions());
    }
  }, [currentUser, dispatch]);

  if (loading) return <Typography>Loading exams...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;


  let exams = [];

  if (currentUser?.examId) {
 
    exams = data ? [data] : [];
  } else {
  
    exams = data;
  }

  if (currentUser && exams.length === 0) {
    return (
      <Typography sx={{ p: 3 }}>
        No exam assigned to you.
      </Typography>
    );
  }


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Exam Papers
      </Typography>

      <Grid container spacing={3}>
        {exams.map((exam) => (
          <Grid item xs={12} sm={6} md={4} key={exam._id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">
                  {exam.title}
                </Typography>

                <Typography variant="body2">
                  {exam.description}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  Duration: {exam.duration} mins
                </Typography>

                <Typography>
                  Questions: {exam.noOfQuestions}
                </Typography>

                <Typography>
                  Pass %: {exam.passPercentage}
                </Typography>

                <Button
                  fullWidth
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={() =>
                    navigate(`/exam/${exam._id}`)
                  }
                >
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExamPaperList;
