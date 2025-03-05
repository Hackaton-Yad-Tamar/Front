import React from "react";
import { Box, Stack } from "@mui/material";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { HomePageImage } from "../../components/HomePageImage/HomePageImage";

const HomePageView: React.FC = () => {
  return (
    <Stack direction="row" spacing={10}  sx={{
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      gap: "10vh",
      backgroundImage: 'url("https://img.freepik.com/premium-vector/palm-leaves-shadow-isolated-white-background-abstract-palm-leaf-shadow_1232255-177.jpg")',
      backgroundSize: "100% 100%",
    }}>
      <HomePageImage />
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
        <SignUp />
      </Box>
    </Stack>
  );
};

export default HomePageView;
