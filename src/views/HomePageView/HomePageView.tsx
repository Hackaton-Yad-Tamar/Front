import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { HomePageImage } from "../../components/HomePageImage/HomePageImage";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { SignUpFamilyDialog } from "../../components/SignUpFamilyDialog/SignUpFamilyDialog";
import { SignUpVolunteerDialog } from "../../components/SignUpVolunteerDialog/SignUpVolunteerDialog";

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
        background: "linear-gradient(to bottom,rgb(242, 251, 255),rgb(74, 176, 245))",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10vh",
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
  );
};

export default HomePageView;
