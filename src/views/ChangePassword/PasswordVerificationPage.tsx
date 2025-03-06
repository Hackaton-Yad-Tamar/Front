import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const generateVerificationCode = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  }

interface EmailVerificationPageProps {
  rightCode: string;
}

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ rightCode }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Verification code submitted:', verificationCode);
    console.log('Right code:', rightCode);
    
    if(verificationCode === rightCode){
      console.log('Verification code is correct')
    setIsVerified(true);;  
      navigate("/reset-password")

    } else {
        console.log('Verification code is incorrect');
        setIsError(true);
    }
    // Here you would typically call an API to verify the code
    // For example:
    // axios.post('your-api-endpoint', { verificationCode });
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ maxWidth: 400, direction: 'rtl' }}>
        <Typography variant="h4" gutterBottom style={{ display: 'flex', justifyContent: 'center' }}>
          אימות אימייל
        </Typography>
        {!isVerified ? (
          <form onSubmit={handleSubmit}>
            <TextField
              label="קוד אימות"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
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
              אמת קוד
            </Button>
          </form>
        ) : (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            האימייל אומת בהצלחה! אתה יכול להמשיך להשתמש בשירותים שלנו.
          </Typography>
        )}
        {isError && <Typography variant="body1" style={{ textAlign: 'center', color: 'red' }}>
            הקוד שהוזן לא נכון!
          </Typography>}
      </Box>
    </div>
  );
};

export default EmailVerificationPage;
