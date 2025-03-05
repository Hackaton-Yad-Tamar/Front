import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import "./i18n/config";
import mockUser from "./mockUser";
import MyRequests from "./MyRequests";
import theme from "./theme";
import ProfileView from "./views/ProfileView/ProfileView";

export const themeColors = {
  lightBlue: "#00AEEE",
  lightGreen: "#67B446",
  darkBlue: "#002F42",
  orange: "#FF8E00",
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requests" element={<MyRequests />} />
            <Route path="/profile" element={<ProfileView user={mockUser} />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
