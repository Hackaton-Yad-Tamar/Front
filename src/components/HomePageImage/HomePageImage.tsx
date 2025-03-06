import { Box, Typography, Fade } from "@mui/material";
import { useState } from "react";
import { imageTextStyle, subTitleStyle } from "./styles";

export const HomePageImage = () => {
  const [show, setShow] = useState(false);
  const [opacity, setOpacity] = useState<string>("opacity(100%)");

  const handleMouseOver = () => {
    setShow(true);
    setOpacity("opacity(90%)");
    setTimeout(() => {
      setOpacity("opacity(100%)");
      setShow(false);
    }, 10000);
  };

  return (
    <>
      <Box sx={{ position: "relative", textAlign: "center", margin: 2 }}>
        <img
          src="./src/assets/Volunteers.png"
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
            filter: opacity,
            borderRadius: "5px",
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
          }}
          height={550}
          onMouseEnter={handleMouseOver}
        />
        <Fade timeout={350} in={show}>
          <Typography width={400} variant="h3" sx={subTitleStyle}>
            יחד נתגבר על המשבר
          </Typography>
        </Fade>
        <Fade timeout={350} in={show}>
          <Typography width={400} variant="h6" sx={imageTextStyle}>
            מעניקים לכם מעטפת שלמה של תמיכה, ידע, כלים וניסיון לניהול נכון של
            התקופה הקשה שאתם עוברים
          </Typography>
        </Fade>
      </Box>
    </>
  );
};
