import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n/config";
import { Namespace } from "./i18n/namespaces";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";

export const themeColors = {
  lightBlue: "#00AEEE",
  lightGreen: "#67B446",
  darkBlue: "#002F42",
  orange: "#FF8E00"
}

const App: React.FC = () => {
  const { t: tProfileView } = useTranslation(Namespace.profileView)
  return (
    <div>
      <Router>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f5f5f5" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/requests" element={<MyRequests />} /> */}
          </Routes>
        </Box>
      </Router>
      <div>{tProfileView("example")}</div>
    </div>
  );
};

export default App;