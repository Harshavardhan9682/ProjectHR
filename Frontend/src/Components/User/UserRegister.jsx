
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { userRegister } from "../../slice/userSlice";

import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const UserRegister = () => {
  const dispatch = useAppDispatch();
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
  });



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData){
      dispatch(userRegister(formData));
      alert("register successfully")
      setFormData({
        name: "",
    email: "",
    password: "",
    category: "",

      })
    }

  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        User Registration
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Category"
          name="category"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <MenuItem value="">select</MenuItem>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>

        {/* {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )} */}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        //   disabled={loading}
        >
          Register{/* {loading ? <CircularProgress size={24} /> : "Register"} */}
        </Button>
      </form>
    </Box>
  );
};

export default UserRegister;
