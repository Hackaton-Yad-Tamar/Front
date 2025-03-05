import { Box, Stack } from "@mui/material";
import React from "react";
import { HomePageImage } from "../../components/HomePageImage/HomePageImage";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import backgroundIm from '../../assets/bg3.jpg';

const HomePageView: React.FC = () => {
  return (
    <Stack direction="row" spacing={10}  sx={{
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      gap: "10vh",
      backgroundImage: `url(${backgroundIm}), linear-gradient(rgba(255, 255, 255, 0.7), rgba(127, 221, 255, 0.68))`,
      backgroundBlendMode: 'overlay',
      backgroundSize: "100% 100%",
    }}>
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
