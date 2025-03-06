import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

function Root() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: (theme) => `calc(100% - ${theme.mixins.toolbar.height})`,
        paddingTop: (theme) => theme.mixins.toolbar.height,
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
}

export default Root;
