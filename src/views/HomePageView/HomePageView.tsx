import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import SignIn from "../../components/SignIn/SignIn";
import { HomePageImage } from "../../components/HomePageImage/HomePageImage";
import { SignUpVolunteerDialog } from "../../components/SignUpVolunteerDialog/SignUpVolunteerDialog";
import { SignUpFamilyDialog } from "../../components/SignUpFamilyDialog/SignUpFamilyDialog";
import { SignUp } from "../../components/SignUp/SignUp";

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
    <Stack
      direction="row"
      spacing={10}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "10vh",
        backgroundImage:
          'url("https://img.freepik.com/premium-vector/palm-leaves-shadow-isolated-white-background-abstract-palm-leaf-shadow_1232255-177.jpg")',
        backgroundSize: "100% 100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: "10vh",
        }}
      >
        <SignIn />
        <SignUp OpenVolunteerSignUp={OpenVolunteerSignUp} OpenFamilySignUp={OpenFamilySignUp} />
        <SignUpVolunteerDialog open={volunteerDialogOpen} onClose={() => setVolunteerDialogOpen(false)} />
        <SignUpFamilyDialog open={familyDialogOpen} onClose={() => setFamilyDialogOpen(false)} />
      </Box>
      <HomePageImage />
    </Stack>
  );
};

export default HomePageView;