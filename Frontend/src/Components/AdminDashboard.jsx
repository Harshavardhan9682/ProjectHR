import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Create Question",
      description: "Add new MCQ questions",
      path: "/create",
    },
    {
      title: "Manage Questions",
      description: "Edit / Delete / Select questions",
      path: "/selectQuestions",
    },
    {
      title: "Exam Papers",
      description: "Create & conduct exams",
      path: "/examPapers",
    },
    {
        title:"Result",
        description:"user results",
        path:"/result"
    },
     {
        title:"Users",
        description:"users data ",
        path:"/Users"
    },
    {
      title:"User Register",
      description:"user register for exam",
      path:"/UserRegister"
    },{
      title:"Login",
      description:"user Login",
      path:"/login"
    }
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
                flexWrap:"wrap",
                width:"220px"
                
              }}
            >
                
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2 }}>
                <Button
                  component={Link}
                  to={card.path}
                  variant="contained"
                  fullWidth
                >
                  Open
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
