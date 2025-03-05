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
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "10vh",
        backgroundImage: 'url("https://img.freepik.com/premium-vector/palm-leaves-shadow-isolated-white-background-abstract-palm-leaf-shadow_1232255-177.jpg")',
        backgroundSize: "100% 100%",
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
