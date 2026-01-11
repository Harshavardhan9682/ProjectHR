import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchExamQuestions } from "../slice/examQuestionsSlice";

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

  const { data, loading } = useAppSelector(
    (state) => state.examQuestions
  );

  useEffect(() => {
    dispatch(fetchExamQuestions());
  }, [dispatch]);

  if (loading) return <Typography>Loading exams...</Typography>;

  const exams = data?.data || [];

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
                <Typography variant="h6" gutterBottom>
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
                {/* <Box sx={{marginTop:"10px", marginLeft:"15px"}}>
                   <Typography sx={{display:"flex" ,gap:"10px", alignItems:"center"}}>
                                        <img
                                            src="/editIcon.png"
                                            alt="edit"
                                            width={30}
                                            height={30}
                                            
                                            style={{ cursor: "pointer" }}
                                          />
                                          <img
                                            src="/delete.png"
                                            alt="delete"
                                            width={35}
                                            height={30}
                                            
                                            style={{ cursor: "pointer" }}
                                          />
                                    </Typography>
                </Box> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExamPaperList;
