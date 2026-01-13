import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { loading, error, token,currentUser } = useSelector(
    (state) => state.user
  );
console.log(currentUser)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  
  useEffect(() => {
  if (token && currentUser) {
    navigate("/examPapers", {
      state: { currentUser },
    });
  }
}, [token, currentUser, navigate]);


  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/back.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}


          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
