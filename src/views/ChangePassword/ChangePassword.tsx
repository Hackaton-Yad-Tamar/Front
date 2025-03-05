import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Handle password change logic here
    // You can now use currentPassword for validation
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm Password:', confirmPassword);
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
    '& .MuiOutlinedInput-notchedOutline': {
      textAlign: 'right',
    },
    '& .MuiOutlinedInput-root': {
      '& > fieldset': {
        textAlign: 'right',
      },
    },
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}} >
    <Box sx={{ maxWidth: 400, direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom style={{display: 'flex', justifyContent:'center'}}>
        שינוי סיסמה
      </Typography>
      <TextField
        label="סיסמה נוכחית"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
        sx={textFieldStyle}
      />
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
        sx={{ marginTop: 2 }}
        fullWidth
      >
        שמור סיסמה
      </Button>
    </Box>
    </div>
  );
};

export default ChangePassword;
