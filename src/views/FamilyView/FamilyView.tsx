import { Box } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyRequests from "./pages/MyRequests";


export const themeColors = {
    lightBlue: "#00AEEE",
    lightGreen: "#67B446",
    darkBlue: "#002F42",
    orange: "#FF8E00"
}

const FamilyView: React.FC = () => {
    return (
        <Router>
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/requests" element={<MyRequests />} />
                </Routes>
            </Box>
        </Router>
    );
};

export default FamilyView;