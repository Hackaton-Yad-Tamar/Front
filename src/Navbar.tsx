import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { themeColors } from "./App";

const Navbar: React.FC = () => {
  const location = useLocation();

  const isOnPath = (path: string) => {
    return location.pathname == path;
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={1}
      sx={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
      }}
    >
      <Toolbar
        sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
      >
        <Box>
          <Button
            sx={{
              color: isOnPath("/") ? "white" : themeColors.darkBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              borderRadius: "20px",
              bgcolor: isOnPath("/") ? themeColors.lightGreen : "white",
              "&:hover": {
                backgroundColor: themeColors.lightGreen,
                color: "white",
              },
            }}
            variant={isOnPath("/") ? "contained" : "text"}
            component={Link}
            to="/"
          >
            דף הבית
          </Button>
          <Button
            sx={{
              color: isOnPath("/requests") ? "white" : themeColors.darkBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              borderRadius: "20px",
              bgcolor: isOnPath("/requests") ? themeColors.lightGreen : "white",
              "&:hover": {
                backgroundColor: themeColors.lightGreen,
                color: "white",
              },
            }}
            component={Link}
            to="/requests"
            variant={isOnPath("/requests") ? "contained" : "text"}
          >
            הבקשות שלי
          </Button>
          <Button
            sx={{
              color: isOnPath("/profile") ? "white" : themeColors.darkBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              borderRadius: "20px",
              bgcolor: isOnPath("/profile") ? themeColors.lightGreen : "white",
              "&:hover": {
                backgroundColor: themeColors.lightGreen,
                color: "white",
              },
            }}
            component={Link}
            to="/profile"
            variant={isOnPath("/profile") ? "contained" : "text"}
          >
            הפרופיל שלי
          </Button>
        </Box>
        <img src=".\public\menu-logo-small.png" width={"5%"} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
