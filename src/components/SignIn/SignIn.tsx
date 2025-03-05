import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { forgotPasswordStyle, signInButtonStyle, signInTextFieldStyle } from './styles';

interface SignInForm {
  email: string;
  password: string;
}

const rtlCache = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
  });  

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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
      formErrors.email = 'מייל דרוש';
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = 'סיסמה דרושה';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('הטופס הוגש בהצלחה');
      // Perform sign-in logic here (e.g., make API calls)
    } else {
      console.log('לטופס יש שגיאות');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        direction: 'rtl',
      }}
    >
        <CacheProvider value={rtlCache}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                width: '19vw',
                padding: '1.5vw',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: '4vh', textAlign: 'center' }}>
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
                sx={ signInTextFieldStyle }
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
                sx={ signInTextFieldStyle }
                />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={ signInButtonStyle }
                    >
                        התחבר
                    </Button>
                </Box>  

                <Box sx={{ marginTop: '10px', textAlign: 'center' }}>
                    <Link href="#" variant="body2"               
                    sx={ forgotPasswordStyle }
              >
                        שכחת את הסיסמה?
                    </Link>
                </Box>

            </Box>
        </CacheProvider>
    </Box>
  );
};

export default SignIn;
