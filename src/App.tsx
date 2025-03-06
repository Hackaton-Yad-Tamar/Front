import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import "./i18n/config";
import router from "./router";
import theme from "./theme";
import { UserProvider } from "./contexts/userContext";

export const themeColors = {
  lightBlue: "#00AEEE",
  lightGreen: "#67B446",
  darkBlue: "#002F42",
  orange: "#FF8E00",
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
