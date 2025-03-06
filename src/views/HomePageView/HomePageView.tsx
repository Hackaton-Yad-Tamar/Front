import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
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

  const OpenVolunteerSignUp = () => {
    setVolunteerDialogOpen(true);
  };

  const OpenFamilySignUp = () => {
    setFamilyDialogOpen(true);
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
        </Box>
        <Typography variant="h3">יד תמר</Typography>
        <Typography variant="h5">תמיכה במשפחות חולי סרטן ובמצבי משבר</Typography>
        <img src=".\public\menu-logo-small.png" width={"5%"} />
      </Toolbar>
    <Stack
      direction="row"
      spacing={10}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        gap: "10vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "100% 100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "4vh",
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
      <HomePageImage />
    </Stack>
    </AppBar>
  );
};

export default HomePageView;
