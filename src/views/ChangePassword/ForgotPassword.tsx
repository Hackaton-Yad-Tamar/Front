import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import EmailVerificationPage from './PasswordVerificationPage';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowingEmail, setIsShowingEmail] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const generateVerificationCode = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsShowingEmail(true);
    const code = generateVerificationCode();
    setGeneratedCode(`${code}`);
    console.log('Password reset requested for:', email);
    axios.post('http://10.0.70.31:8000/send-email', {
        to_email: email,
        subject: "password change",
        body: "your verification code is: " + code

      } ); // Replace with your API endpoint
    
    setIsSubmitted(true);
  };

  const textFieldStyle = {
    '& .MuiInputLabel-root': {
      right: 16,
      left: 'auto',
      transformOrigin: 'top right',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(0, -9px) scale(0.75)',
    },
    '& .MuiInputBase-input': {
      textAlign: 'right',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      '& > fieldset': {
        textAlign: 'right',
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <Box sx={{ maxWidth: 400, direction: 'rtl' }}>
        <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center' }}>
          איפוס סיסמה
        </Typography>
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
                marginTop: 2,
                borderRadius: '10px',
                backgroundColor: '#34C759',
                height: '40px',
                width: '200px',
                fontSize: '16px',
                margin: 'auto',
                display: 'block',
              }}
            >
              שלח הוראות איפוס
            </Button>
          </form>
        ) : (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            אם קיים חשבון עבור {email}, תקבל הוראות לאיפוס הסיסמה באימייל.
          </Typography>
        )}
        {isShowingEmail && (<EmailVerificationPage rightCode={generatedCode}/>)}
      </Box>
    </div>
  );
};

export default ResetPassword;