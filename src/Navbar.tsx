import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { themeColors } from "./App";
import { Route } from "./router";
import { useUser } from "./contexts/userContext";

const Navbar: React.FC = () => {
  const { user } = useUser();

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
            to={Route.home}
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
            to={Route.requests}
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
            to={Route.profile}
          >
            הפרופיל שלי
          </Button>
        </Box>
        <Typography>שלום {user?.firstName}</Typography>
        <img src=".\public\menu-logo-small.png" width={"5%"} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
