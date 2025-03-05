import { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { useQuery } from "react-query";
import { signUpButtonStyle } from "./styles";
import { getData, saveData } from '../../api/axios';

const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const fetchCities = async () => {
  return await getData('http://localhost:8000/users/cities');
};

const fetchSkills = async () => {
  return await getData('http://localhost:8000/users/skills');
};

const fetchLicenses = async () => {
  return await getData('http://localhost:8000/users/licenses');
};

type Props = {
  open: boolean;
  onClose: any;
};

export const SignUpDialog = ({ open, onClose }: Props) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    preferred_city: "",
    preferred_skill: "",
    license_level: ""
  });

  const { data: cities = [] } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const { data: skills = [] } = useQuery({
    queryKey: ['skills'],
    queryFn: fetchSkills,
  });

  const { data: licenses = [] } = useQuery({
    queryKey: ['licenses'],
    queryFn: fetchLicenses,
  });


  const handleSave = async () => {
    if (isFormInvalid()) return;

    try {
      console.log(formData);
      await saveData('http://localhost:8000/users/signup/vulenteer', formData);
      console.log('המשתמש נשמר בהצלחה!');
      onClose();
    } catch (error) {
        console.error('שגיאה בשמירת המשתמש:', error);
        console.log('אירעה שגיאה במהלך שמירת המשתמש. אנא נסה שוב מאוחר יותר.'); 
    }
  };

  const nameRegex = /^.{0,50}$/;
  const phoneNumberRegex = /^\d{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isFirstNameInvalid = () => !nameRegex.test(formData.first_name);
  const isLastNameInvalid = () => !nameRegex.test(formData.last_name);
  const isPhoneInvalid = () => !phoneNumberRegex.test(formData.phone_number);
  const isEmailInvalid = () => !emailRegex.test(formData.email);

  const isFormInvalid = () =>
    isFirstNameInvalid() || isLastNameInvalid() || isPhoneInvalid() || isEmailInvalid();

  const formFields = [
    {
      key: "first_name",
      label: "שם פרטי",
      type: "text",
      error: isFirstNameInvalid(),
      helperText: "השם יכול להיות עד 50 תווים",
      inputProps: { maxLength: 50 },
      component: "textField",
    },
    {
      key: "last_name",
      label: "שם משפחה",
      type: "text",
      error: isLastNameInvalid(),
      helperText: "השם יכול להיות עד 50 תווים",
      inputProps: { maxLength: 50 },
      component: "textField",
    },
    {
      key: "phone_number",
      label: "מספר טלפון",
      type: "number",
      error: isPhoneInvalid(),
      helperText: "מספר טלפון לא תקין",
      component: "textField",
    },
    {
      key: "email",
      label: "מייל",
      type: "text",
      error: isEmailInvalid(),
      helperText: "מייל לא תקין",
      component: "textField",
    },
    {
      key: "address",
      label: "כתובת",
      component: "textField",
    },
    {
      key: "city",
      label: "עיר מגורים",
      component: "select",
      list: cities,
      fieldToPresent: 'city_name'
    },
    {
      key: "preferred_city",
      label: "עיר מועדפת",
      component: "select",
      list: cities,
      fieldToPresent: 'city_name'
    },
    {
      key: "preferred_skill",
      label: "התנדבות מועדפת",
      component: "select",
      list: skills,
      fieldToPresent: 'type_name'
    },
    {
      key: "license_level",
      label: "סוג רישיון",
      component: "select",
      list: licenses,
      fieldToPresent: 'license_name'
    },
  ];

  useEffect(() => {
    if (open) {
      setFormData({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        preferred_city: "",
        preferred_skill: "",
        license_level: ""
      });
    }
  }, [open]);

  const handleChange = (key) => (event) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: event.target.value,
    }));
  };


  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>
        <Box sx={{ flex: 1, textAlign: "center" }}>הצטרפות לעמותה </Box>
      </DialogTitle>
      <DialogContent sx={{ direction: "rtl" }}>
        {formFields.map((field) => (
          <FormControl
            fullWidth
            margin="normal"
            key={field.key}
            sx={{ direction: "rtl" }}
          >
            <CacheProvider value={rtlCache}>
              {field.component === "textField" && (
                <TextField
                  label={field.label}
                  type={field.type}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={handleChange(field.key)}
                  required
                  error={field.error || !formData[field.key as keyof typeof formData]}
                />
              )}
              {field.component === "select" && (
                <>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    label={field.label}
                    value={formData[field.key as keyof typeof formData] || ""}
                    onChange={handleChange(field.key)}
                    required
                    error={field.error || !formData[field.key as keyof typeof formData]}
                  >
                    {field.list?.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type[field.fieldToPresent!]}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
              {field.error && (
                <FormHelperText sx={{ color: "red" }}>
                  {field.helperText}
                </FormHelperText>
              )}
            </CacheProvider>
          </FormControl>
        ))}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button onClick={handleSave} disabled={isFormInvalid()} sx={signUpButtonStyle}>
          הצטרפות
        </Button>
      </DialogActions>
    </Dialog>
  );
};
