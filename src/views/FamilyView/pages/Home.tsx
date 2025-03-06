import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { themeColors } from "../../../App";
import NewRequestForm from "../components/newRequestDialog";

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "30vh",
          width: "100%",
          minHeight: "200px",
          background: "linear-gradient(to bottom, #a5ddf7, #78c2f2)",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "white",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          ברוכים הבאים למערכת התנדבות
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "medium",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            fontSize: { xs: "1rem", md: "1.3rem" },
          }}
        >
          יחד נעזור לקהילה שלנו לצמוח ולהתפתח
        </Typography>
        <NewRequestForm />
      </Box>

      {/* Steps Section */}
      <Container
        sx={{ flexGrow: 1, my: 8, textAlign: "center", direction: "rtl", maxWidth: "1200px" }}
      >
        {/* Enhanced Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 5,
            background: "linear-gradient(to right, #ff8a00, #e52e71)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "3px 3px 6px rgba(0,0,0,0.1)",
            display: "inline-block",
            borderBottom: "4px solid #ff8a00",
            pb: 1,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
          }}
        >
          איך זה עובד?
        </Typography>

        {/* Steps with Arrows */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap={{ xs: "wrap", md: "nowrap" }} // Wrap on mobile, single line on desktop
          gap={3}
          maxWidth="100%"
        >
          {[
            "פתחו בקשה חדשה ותארו את הצורך שלכם",
            "מתנדב ייצור איתכם קשר ויתאם את הסיוע",
            "קבלו את העזרה ותנו משוב על החוויה",
          ].map((text, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <Paper
                sx={{
                  p: 4,
                  width: { xs: "90%", sm: "30%" }, // Full width on mobile, 30% on larger screens
                  textAlign: "center",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Typography variant="h5" fontWeight="bold" color={themeColors.orange}>
                  שלב {index + 1}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body1">{text}</Typography>
              </Paper>

              {/* Reversed Arrow (except for the last step) */}
              {index < 2 && (
                <ArrowBackIcon
                  sx={{
                    fontSize: { xs: 30, sm: 40 },
                    color: "#ff8a00",
                    mx: { xs: 1, sm: 2 },
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Home;
