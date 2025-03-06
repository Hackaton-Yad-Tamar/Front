import { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { dialogStyle, signInButtonStyle, signInTextFieldStyle } from "./styles";
import { saveData } from '../../api/axios';
import { SHA256 } from "crypto-js";

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

type Props = {
  open: boolean;
  onClose: any;
  email: string
};

export const FirstSignInDialog = ({ open, onClose, email }: Props) => {
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSave = async () => {
    if (!isPasswordsMatch()) {
      setShowAlert(true);
      return;
    }

    await saveData('http://localhost:8000/users/update-password', { password: SHA256(password).toString(), email });
    onClose();
    console.log("password changed");
  };

  const passwordRegex = /^.{0,50}$/;
  const isPasswordInvalid = () => !passwordRegex.test(password);
  const isPasswordsMatch = () => password === checkPassword;

  useEffect(() => {
    if (open) {
      setPassword("");
    }
  }, [open]);

  const handleChange = ({ currentTarget }: any) => {
    setPassword(currentTarget.value);
  };

  const handlecheckedChange = ({ currentTarget }: any) => {
    setCheckPassword(currentTarget.value);
  };

  return (
    <CacheProvider value={rtlCache}>
      <Dialog open={open} sx={dialogStyle}>
        <DialogTitle>
          <Box sx={{ flex: 1, textAlign: "center" }}>
            שמחים שהצטרפת אלינו! נותר רק לבחור סיסמה
          </Box>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              sx={signInTextFieldStyle}
              label="סיסמה חדשה"
              type="password"
              onChange={handleChange}
              required
            />
            <TextField
              sx={signInTextFieldStyle}
              label="אימות סיסמה"
              type="password"
              onChange={handlecheckedChange}
              required
            />
            {showAlert && <Typography>שים לב! הסיסמאות לא תואמות</Typography>}
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={signInButtonStyle}
            onClick={handleSave}
            disabled={isPasswordInvalid()}
          >
            שנה סיסמה
          </Button>
        </DialogActions>
      </Dialog>
    </CacheProvider>
  );
};
