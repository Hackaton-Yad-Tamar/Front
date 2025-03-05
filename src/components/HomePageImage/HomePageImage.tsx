import { Box, Typography, Fade } from "@mui/material";
import { useState } from "react";
import { imageTextStyle, subTitleStyle, titleStyle } from "./styles";

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
            borderRadius: "5px"
          }}
          loading="lazy"
          height={600}
          onMouseEnter={handleMouseOver}
        />
        <Fade timeout={350} in={show}>
          <Typography variant="h1" sx={titleStyle}>
            יד תמר
          </Typography>
        </Fade>
        <Fade timeout={350} in={show}>
          <Typography variant="h3" sx={subTitleStyle}>
            יחד נתגבר על המשבר
          </Typography>
        </Fade>
        <Fade timeout={350} in={show}>
          <Typography variant="h6" sx={imageTextStyle}>
            מעניקים לכם מעטפת שלמה של תמיכה, ידע, כלים וניסיון
          </Typography>
        </Fade>
        <Fade timeout={350} in={show}>
          <Typography variant="h6" sx={{...imageTextStyle, top: "80%"}}>
            לניהול נכון של התקופה הקשה שאתם עוברים
          </Typography>
        </Fade>
      </Box>
    </>
  );
};
