import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Password reset requested for:', email);
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
      </Box>
    </div>
  );
};

export default ResetPassword;