import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const ExamTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(null);


  useEffect(() => {
    if (duration > 0) {
      setTimeLeft(duration * 60);
    }
  }, [duration]);


  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
  <Box
  sx={{
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#fff",   // ✅ white background
    borderBottom: "1px solid #e0e0e0",
    height: "70px",
    zIndex: 999,
  }}
>
  {/* Logo */}
  <Box
    id="aifaLogo"
    sx={{
      position: "fixed",
      top: 15,
      left: 20,
      zIndex: 1000,
    }}
  >
    <img src="/aifalogo.svg" alt="AIFA Logo" height="40" />
  </Box>

  {/* Timer */}
  <Box
    id="timer"
    sx={{
      position: "fixed",
      top: 15,
      right: 20,
      backgroundColor: "#f5f5f5", // light gray card
      color: "#000",
      padding: "8px 16px",
      borderRadius: "10px",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: 1,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      Time Left:
    </Typography>

    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </Typography>
  </Box>
</Box>

  );
};

export default ExamTimer;
