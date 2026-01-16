import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const cards = [
    { title: "Create Question", description: "Add new MCQ questions", path: "/create" },
    { title: "Manage Questions", description: "Edit / Delete / Select questions", path: "/selectQuestions" },
    { title: "Exam Papers", description: "Create & conduct exams", path: "/examPapers" },
    { title: "Result", description: "User results", path: "/result" },
    { title: "Users", description: "Users data", path: "/Users" },
    { title: "User Register", description: "User register for exam", path: "/UserRegister" },
    { title: "Login", description: "User Login", path: "/login" },
  ];

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {(loading ? Array.from(new Array(6)) : cards).map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                width: "220px",
              }}
            >
              <CardContent>
                {loading ? (
                  <Stack spacing={1}>
                    <Skeleton variant="text" height={30} width="80%" />
                    <Skeleton variant="text" height={20} width="100%" />
                    <Skeleton variant="text" height={20} width="90%" />
                  </Stack>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </>
                )}
              </CardContent>

              <Box sx={{ p: 2 }}>
                {loading ? (
                  <Skeleton variant="rectangular" height={36} />
                ) : (
                  <Button
                    component={Link}
                    to={card.path}
                    variant="contained"
                    fullWidth
                  >
                    Open
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
