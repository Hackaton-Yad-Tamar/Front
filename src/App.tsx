import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import "./i18n/config";
import { mockUser } from "./mockUser";
import theme from "./theme";
import ProfileView from "./views/ProfileView/ProfileView";
import Home from "./views/FamilyView/pages/Home";
import MyRequests from "./views/FamilyView/pages/MyRequests";
import RequestPage from "./components/volunteerComponents/requestsPage";

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: (theme) => `calc(100% - ${theme.mixins.toolbar.height})`,
            paddingTop: (theme) => theme.mixins.toolbar.height,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requests" element={<MyRequests />} />
            <Route path="/profile" element={<ProfileView user={mockUser} />} />
            <Route path="/volunteer" element={<RequestPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
