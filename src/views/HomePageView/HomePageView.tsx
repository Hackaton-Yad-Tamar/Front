import { Box, Stack } from "@mui/material";
import React from "react";
import { HomePageImage } from "../../components/HomePageImage/HomePageImage";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

const HomePageView: React.FC = () => {
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
      <HomePageImage />
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
        <SignUp />
      </Box>
    </Stack>
  );
};

export default HomePageView;
