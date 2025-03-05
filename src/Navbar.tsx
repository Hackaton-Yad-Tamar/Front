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
      position="static"
      color="transparent"
      elevation={1}
      sx={{ px: 2, py: 1, marginBottom: "1rem" }}
    >
      <Toolbar
        sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}
      >
        <Box>
          <Button
            sx={{
              color: isOnPath("/") ? "white" : themeColors.lightBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              bgcolor: isOnPath("/") ? themeColors.lightBlue : "white",
            }}
            variant={isOnPath("/") ? "contained" : "text"}
            component={Link}
            to="/"
          >
            דף הבית
          </Button>
          <Button
            sx={{
              color: isOnPath("/requests") ? "white" : themeColors.lightBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              bgcolor: isOnPath("/requests") ? themeColors.lightBlue : "white",
            }}
            component={Link}
            to="/requests"
            variant={isOnPath("/requests") ? "contained" : "text"}
          >
            הבקשות שלי
          </Button>
          <Button
            sx={{
              color: isOnPath("/profile") ? "white" : themeColors.lightBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              bgcolor: isOnPath("/profile") ? themeColors.lightBlue : "white",
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
