import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import EmailVerificationPage from "./PasswordVerificationPage";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowingEmail, setIsShowingEmail] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const generateVerificationCode = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsShowingEmail(true);
    const code = generateVerificationCode();
    setGeneratedCode(`${code}`);
    console.log("Password reset requested for:", email);
    axios.post(`${import.meta.env.VITE_MESSAGE_URL}/send-email`, {
      to_email: email,
      subject: "password change",
      body: "your verification code is: " + code,
    }); // Replace with your API endpoint

    setIsSubmitted(true);
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
      borderRadius: "20px",
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
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="כתובת אימייל"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              sx={textFieldStyle}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "10px",
                backgroundColor: "#34C759",
                height: "40px",
                width: "200px",
                fontSize: "16px",
                margin: "auto",
                display: "block",
              }}
            >
              שלח הוראות איפוס
            </Button>
          </form>
        ) : (
          <Typography variant="body1" style={{ textAlign: "center", marginBottom: "1rem" }}>
            אם קיים חשבון עבור {email}, תקבל הוראות לאיפוס הסיסמה באימייל.
          </Typography>
        )}
        {isShowingEmail && <EmailVerificationPage rightCode={generatedCode} />}
      </Box>
    </Box>
  );
};

export default ResetPassword;
