import { AppBar, Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { themeColors } from "./App";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={1}
      sx={{ px: 2, py: 1, marginBottom: "1rem" }}
    >
      <Toolbar sx={{ display: "flex", gap: 3, justifyContent: "space-between" }}>
        <Box>
          <Button
            sx={{ color: themeColors.lightBlue, fontWeight: "bold", fontSize: "2.5vh", px: 2 }}
            component={Link}
            to="/"
          >
            דף הבית
          </Button>
          <Button
            sx={{ color: themeColors.lightBlue, fontWeight: "bold", fontSize: "2.5vh", px: 2 }}
            component={Link}
            to="/requests"
          >
            הבקשות שלי
          </Button>
          <Button
            sx={{ color: themeColors.lightBlue, fontWeight: "bold", fontSize: "2.5vh", px: 2 }}
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
