import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  label,
  value,
  onChange,
 
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val);
      }}
    
    />
  );
};

export default CustomTextField;
