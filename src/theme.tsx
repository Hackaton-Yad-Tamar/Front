import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik",
  },
  mixins: {
    toolbar: {
      height: "5rem",
    },
  },
});

export default theme;
