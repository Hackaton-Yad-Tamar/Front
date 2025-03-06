import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const NewPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Handle password change logic here
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  const textFieldStyle = {
    "& .MuiInputLabel-root": {
      right: 16,
      left: "auto",
      transformOrigin: "top right",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -9px) scale(0.75)",
    },
    "& .MuiInputBase-input": {
      textAlign: "right",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px", // Increased border radius
      "& > fieldset": {
        textAlign: "right",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: (theme) => `calc(100vh - ${theme.mixins.toolbar.height})`,
        width: "100%",
        background: "linear-gradient(to bottom,rgb(215, 239, 249),rgb(74, 176, 245))",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ display: "flex", justifyContent: "center", color: "white" }}
      >
        איפוס סיסמה
      </Typography>
      <Box
        sx={{
          height: "fit-contnet",
          direction: "rtl",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
        }}
      >
        <TextField
          label="סיסמה חדשה"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={textFieldStyle}
        />
        <TextField
          label="אימות סיסמה חדשה"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          sx={textFieldStyle}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangePassword}
          sx={{
            marginTop: 2,
            borderRadius: "10px",
            backgroundColor: "#34C759", // Green color
            height: "40px", // Make it smaller
            width: "200px", // Make it smaller
            fontSize: "16px", // Adjust font size
            margin: "auto", // Center the button horizontally
            display: "block", // Required for margin: 'auto' to work
          }}
          fullWidth
        >
          שמור סיסמה
        </Button>
      </Box>
    </Box>
  );
};

export default NewPassword;
