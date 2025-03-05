import { Box, ThemeProvider } from '@mui/material';
import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePageView from './views/HomePageView/HomePageView';
import './i18n/config';
import { mockUser } from './mockUser';
import MyRequests from './MyRequests';
import theme from './theme';
import ProfileView from './views/ProfileView/ProfileView';
import Leaderboard from './views/Leaderboard/Leaderboard';

export const themeColors = {
  lightBlue: '#00AEEE',
  lightGreen: '#67B446',
  darkBlue: '#002F42',
  orange: '#FF8E00',
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingTop: "14vh" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePageView />} />
            <Route path="/requests" element={<MyRequests />} />
            <Route
              path="/profile"
              element={<ProfileView user={mockUser} />}
            />
            <Route
              path="/community"
              element={<Leaderboard />}
            />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
