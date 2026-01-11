import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAllExamResults } from "../slice/submitExam";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const ExamResultCards = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ FIXED SELECTOR
  const { results, loading, error } = useAppSelector(
    (state) => state.submit
  );

  console.log(results)
  useEffect(() => {
    dispatch(getAllExamResults());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!results || results.length === 0)
    return <Typography>No results found</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exam Results
      </Typography>

      <Grid container spacing={3}>
        {results.map((exam) => {
          const submissions = exam.submissions || [];
          const totalAttempts = submissions.length;

          const avgScore =
            totalAttempts > 0
              ? Math.round(
                  submissions.reduce(
                    (sum, s) => sum + s.score,
                    0
                  ) / totalAttempts
                )
              : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={exam._id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Exam ID
                  </Typography>

                  <Typography variant="body2">
                    {exam.examId}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    Total Attempts: {totalAttempts}
                  </Typography>

                  <Typography>
                    Average Score: {avgScore}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() =>
                      navigate(`/result/${exam.examId}`)
                    }
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ExamResultCards;
``
