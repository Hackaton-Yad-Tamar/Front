import { Box, Button, Typography } from "@mui/material";
import { signUpButtonStyle } from "./styles";

type Props = {
  OpenVolunteerSignUp: any;
  OpenFamilySignUp: any;
};

const SignUp = ({OpenVolunteerSignUp, OpenFamilySignUp}: Props) => {
  const handleVolunteerSignUp = () => {
    console.log("הירשם כמתנדב");
    // Add logic for volunteer sign-up
  };

  const handleFamilySignUp = () => {
    console.log("הירשם כמשפחה");
    // Add logic for family sign-up
    OpenVolunteerSignUp();
  };

  const handleFamilySignUp = () => {
    OpenFamilySignUp();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      <Box
        sx={{
          width: "19vw",
          padding: "1.5vw",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "4vh",
            textAlign: "center",
          }}
        >
          צור משתמש חדש
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ ...signUpButtonStyle, marginBottom: "2vh" }}
          onClick={handleVolunteerSignUp}
        >
          הירשם כמתנדב
        </Button>

        <Button variant="contained" fullWidth sx={signUpButtonStyle} onClick={handleFamilySignUp}>
          הירשם כמשפחה
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;