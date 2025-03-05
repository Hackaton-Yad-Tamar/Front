import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { themeColors } from "./App";

const Navbar: React.FC = () => {
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
      <Toolbar sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}>
        <Box>
          <Button
            sx={{
              color: themeColors.darkBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: themeColors.lightGreen,
                color: "white",
              },
            }}
            component={Link}
            to="/"
          >
            דף הבית
          </Button>
          <Button
            sx={{
              color: themeColors.darkBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: themeColors.lightGreen,
                color: "white",
              },
            }}
            component={Link}
            to="/requests"
          >
            הבקשות שלי
          </Button>
          <Button
            sx={{
              color: themeColors.darkBlue,
              fontWeight: "bold",
              fontSize: "2.5vh",
              px: 2,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: themeColors.lightGreen,
                color: "white",
              },
            }}
            component={Link}
            to="/profile"
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
