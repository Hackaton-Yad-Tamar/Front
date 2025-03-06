import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { HomePageImage } from "../../components/HomePageImage/HomePageImage";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { SignUpFamilyDialog } from "../../components/SignUpFamilyDialog/SignUpFamilyDialog";
import { SignUpVolunteerDialog } from "../../components/SignUpVolunteerDialog/SignUpVolunteerDialog";
import bgImage from "../../assets/signBackground.png";

const HomePageView: React.FC = () => {
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);
  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);

  const OpenVolunteerSignUp = () => setVolunteerDialogOpen(true);
  const OpenFamilySignUp = () => setFamilyDialogOpen(true);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation Bar */}
      <AppBar
        position="static"
        color="transparent"
        elevation={1}
        sx={{ backgroundColor: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            px: { xs: 1, sm: 4 },
            py: 3,
            gap: { xs: 0.5, sm: 3 },
          }}
        >
          {/* Logo */}
          <img
            src=".\public\menu-logo-small.png"
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />

          {/* Titles */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontSize: { xs: "1.15rem", sm: "2.5rem" } }}>
              יד תמר | תמיכה במשפחות חולי סרטן ובמצבי משבר  
            </Typography>
          </Box>

          <Box sx={{ width: "40px" }} /> {/* Empty box to balance layout */}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 10 }} // Reduced gap here for closer SignIn and SignUp
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: '7vw',
          px: { xs: 3, sm: 6 },
        }}
      >
        {/* Sign In and Sign Up */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5vh",  // Reduced gap here between SignIn and SignUp
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <SignIn />
          <SignUp OpenVolunteerSignUp={OpenVolunteerSignUp} OpenFamilySignUp={OpenFamilySignUp} />
          <SignUpVolunteerDialog
            open={volunteerDialogOpen}
            onClose={() => setVolunteerDialogOpen(false)}
          />
          <SignUpFamilyDialog open={familyDialogOpen} onClose={() => setFamilyDialogOpen(false)} />
        </Box>

        {/* Hide Image on Small Screens */}
        <Box sx={{ display: { xs: "none", md: "block" }, maxWidth: "50%" }}>
          <HomePageImage />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePageView;
