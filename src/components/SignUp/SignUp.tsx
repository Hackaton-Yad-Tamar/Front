import { Box, Button, Typography } from "@mui/material";
import { signUpButtonStyle } from "./styles";

type Props = {
  OpenVolunteerSignUp: any;
  OpenFamilySignUp: any;
};

const SignUp = ({ OpenVolunteerSignUp, OpenFamilySignUp }: Props) => {
  const handleVolunteerSignUp = () => {
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
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "80%", sm: "60%", md: "19vw" },  // Adjusts width for responsiveness
          padding: "5% 3%",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "4vh",
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

        <Button
          variant="contained"
          fullWidth
          sx={signUpButtonStyle}
          onClick={handleFamilySignUp}
        >
          הירשם כמשפחה
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
