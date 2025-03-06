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
    Checkbox,
    FormControlLabel
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
    return await getData(`${import.meta.env["VITE_HOST_URL"]}/users/cities`);
};

type Props = {
    open: boolean;
    onClose: any;
};

export const SignUpFamilyDialog = ({ open, onClose }: Props) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        address: "",
        city: "",
        floor_number: "",
        has_parking: false,
        has_elevator: false,
        is_private_house: false
    });

    const { data: cities = [] } = useQuery({
        queryKey: ['cities'],
        queryFn: fetchCities,
    });


    const handleSave = async () => {
        if (isFormInvalid()) return;

        try {
            console.log(formData);
            await saveData(`${import.meta.env["VITE_HOST_URL"]}/users/signup/family`, formData);
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
            key: "floor_number",
            label: "מספר קומה",
            type: "number",
            component: "textField",
        },
        {
            key: "has_parking",
            label: "האם יש חניה?",
            type: "boolean",
            component: "checkbox",
        },
        {
            key: "has_elevator",
            label: "האם יש מעלית?",
            type: "boolean",
            component: "checkbox",
        },
        {
            key: "is_private_house",
            label: "האם בית פרטי?",
            type: "boolean",
            component: "checkbox",
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
                floor_number: "",
                has_parking: false,
                has_elevator: false,
                is_private_house: false
            });
        }
    }, [open]);

    const handleChange = (key: any) => (event: any) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
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
                                        {field.list?.map((type: any) => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type[field.fieldToPresent!]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                {field.component === "checkbox" && (
                                    <>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData[field.key as keyof typeof formData]}
                                                    onChange={handleChange(field.key)}
                                                    color="default"
                                                />
                                            }
                                            label={field.label}
                                            labelPlacement="start" // Places the label on the left of the checkbox
                                        />
                                    </>
                                )}
                            </Box>
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
