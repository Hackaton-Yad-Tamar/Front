import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import {
    forgotPasswordStyle,
    signInButtonStyle,
    signInTextFieldStyle,
} from "./styles";
import { FirstSignInDialog } from "../FirstSignInDialog/FirstSignInDialog";
import { saveData } from "../../api/axios";
import { SHA256 } from "crypto-js";
import { useUser } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

interface SignInForm {
    email: string;
    password: string;
}

const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
});

const SignIn: React.FC = () => {
    const [formData, setFormData] = useState<SignInForm>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
    const { login } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user");
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        let formErrors: { email?: string; password?: string } = {};
        let isValid = true;

        if (!formData.email) {
            formErrors.email = "מייל דרוש";
            isValid = false;
        }

        if (!formData.password) {
            formErrors.password = "סיסמה דרושה";
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const user = await saveData(
                    `${import.meta.env["VITE_HOST_URL"]}/users/signin`,
                    {
                        email: formData.email,
                        password: SHA256(formData.password).toString(),
                    }
                );

                if (!user.first_sign_in) {
                    login(user);
                    if (user.user_type == 2) {
                        navigate("/home")
                    } else if (user.user_type == 1) {
                        navigate("/home")
                    } else {
                        navigate("/dashboard")
                    }
                }
                setIsFirstTime(user.first_sign_in);
            } catch (error) {
                console.error("Error signing in:", error);
                setErrors({ email: "שגיאה בכניסה", password: "שגיאה בכניסה" });
            }
        } else {
            console.log("לטופס יש שגיאות");
        }
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
            <CacheProvider value={rtlCache}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: { xs: "80%", sm: "100%", md: "30vw" }, // Adjusts width for responsiveness
                        padding: "1% 3%",
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: "10px"
                        }}
                    >
                        כניסה למשתמש קיים
                    </Typography>

                    <TextField
                        label="מייל"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            ...signInTextFieldStyle,
                            marginBottom: { xs: "2vh", sm: "3vh" },
                        }}
                    />

                    <TextField
                        label="סיסמה"
                        variant="outlined"
                        type="password"
                        fullWidth
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={signInTextFieldStyle}
                    />

                    <Box
                        sx={{ display: "flex", justifyContent: "center", marginTop: "3vh" }}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                ...signInButtonStyle,
                                width: { xs: "100%", sm: "auto" },
                            }}
                        >
                            התחבר
                        </Button>
                    </Box>

                    <FirstSignInDialog
                        email={formData.email}
                        open={isFirstTime}
                        onClose={() => setIsFirstTime(false)}
                    />

                    <Box sx={{ marginTop: "10px", textAlign: "center" }}>
                        <Link href="#" variant="body2" sx={forgotPasswordStyle}>
                            שכחת את הסיסמה?
                        </Link>
                    </Box>
                </Box>
            </CacheProvider>
        </Box>
    );
};

export default SignIn;
