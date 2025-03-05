import { AppBar, Button, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ px: 2, py: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "right", gap: 3 }}>
        <Button color="primary" sx={{ fontWeight: "bold", fontSize: '2.5vh' }} component={Link} to="/">
          דף הבית
        </Button>
        <Button color="primary" sx={{ fontWeight: "bold", fontSize: '2.5vh' }} component={Link} to="/requests">
          הבקשות שלי
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;