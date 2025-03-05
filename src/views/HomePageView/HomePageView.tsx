import React from 'react';
import { Box } from '@mui/material';
import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

const HomePageView: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        gap: '10vh'
      }}
    >
      <SignIn />
      <SignUp />
    </Box>
  );
};

export default HomePageView;
