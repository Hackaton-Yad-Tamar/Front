import React from "react";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Paper } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f5f5f5" }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ px: 2, py: 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#1976d2", fontWeight: "bold" }}>
            דף הבית
          </Typography>
          <Button color="primary" sx={{ fontWeight: "bold" }}>הבקשות שלי</Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ backgroundColor: "#2196F3", color: "white", py: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="h4" fontWeight="bold">
            ברוכים הבאים למערכת התנדבות
          </Typography>
          <Typography variant="h6" mt={1}>
            יחד נעזור לקהילה שלנו לצמוח ולהתפתח
          </Typography>
          <Button variant="contained" color="error" sx={{ mt: 3, borderRadius: "20px", px: 4, py: 1.5, fontSize: "1.1rem" }}>
            פתיחת בקשה חדשה
          </Button>
        </Container>
      </Box>

      {/* Steps Section */}
      <Container sx={{ flexGrow: 1, my: 6 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
          איך זה עובד?
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {["פתחו בקשה חדשה ותארו את הצורך שלכם", "מתנדב ייצור איתכם קשר ויתאם את הסיוע", "קבלו את העזרה ותנו משוב על החוויה"].map((text, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper sx={{ p: 4, textAlign: "center", borderRadius: "15px", boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">שלב {index + 1}</Typography>
                <Typography mt={1}>{text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;