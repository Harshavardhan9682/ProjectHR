import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CustomTextField from "../custom/customTextField";
import { useAppDispatch } from "../store/store";
import { addQuestions } from "../slice/addQuestions";

const CreateQuestions = () => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    type: "",
    questionText: "",
    options: ["", "", "", ""],
    correctOptionIndex: "",
  });

  
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

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);

    // Example dispatch (add your thunk here)
    dispatch(addQuestions(formData))
    setFormData({
          type: "",
    questionText: "",
    options: ["", "", "", ""],
    correctOptionIndex: "",

    })
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
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

      <CustomTextField
        label="Option A"
        value={formData.options[0]}
        onChange={(val) => handleOptionChange(0, val)}
      />

      <CustomTextField
        label="Option B"
        value={formData.options[1]}
        onChange={(val) => handleOptionChange(1, val)}
      />

      <CustomTextField
        label="Option C"
        value={formData.options[2]}
        onChange={(val) => handleOptionChange(2, val)}
      />

      <CustomTextField
        label="Option D"
        value={formData.options[3]}
        onChange={(val) => handleOptionChange(3, val)}
      />

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

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Save Question
      </Button>
    </Box>
  );
};

export default CreateQuestions;
