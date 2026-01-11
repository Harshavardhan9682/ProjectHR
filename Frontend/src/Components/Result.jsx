

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getExamResult } from "../slice/submitExam";

import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ResultPage = () => {
  const { examId } = useParams();
  const dispatch = useAppDispatch();

  const { results, loading, error } = useAppSelector(
    (state) => state.submit
  );

  useEffect(() => {
    if (examId) {
      dispatch(getExamResult(examId));
    }
  }, [examId, dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!results || results.length === 0)
    return <Typography>No result found</Typography>;

  
  const submissions = results[0]?.submissions || [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Exam Result
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>#</b></TableCell>
              <TableCell><b>Score</b></TableCell>
              <TableCell><b>Percentage</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {submissions.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.percentage}%</TableCell>
                <TableCell
                  sx={{
                    color: item.passed ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {item.passed ? "PASSED" : "FAILED"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultPage;

