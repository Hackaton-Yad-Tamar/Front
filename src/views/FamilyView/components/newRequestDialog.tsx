import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Tooltip,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  Checkbox,
  Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { themeColors } from "../../../App";
import axiosInstance from "../../../axios";
import { mockUser } from "../../../mockUser";
import { useUser } from "../../../contexts/userContext";
import { v4 as uuidv4 } from "uuid";
import { RequestType } from "../../../types/request";
import { set } from "ol/transform";

const NewRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [requestType, setRequestType] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [requiresVihcle, setRequiresVihcle] = useState(false);
  const [showMassage, setShowMassage] = useState(false);
  const [massage, setMassage] = useState("");
  const { user } = useUser();
  const [types, setTypes] = useState<RequestType[]>([]);
  const [cities, setCities] = useState<{ city_name: string; id: number }[]>([]);

  useEffect(() => {
    axiosInstance
      .get<RequestType[]>("/api/request_type")
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => console.error(error));

    axiosInstance
      .get<{ city_name: string; id: number }[]>("/users/cities")
      .then((response) => {
        console.log(response);
        setCities(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [errors, setErrors] = useState({
    title: false,
    requestType: false,
    date: false,
    description: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDate(null);
    setDescription("");
    setRequestType("");
    setTitle("");
    setIsUrgent(false);
    setMassage("");
  };

  const validateForm = () => {
    return title && requestType && date && description;
  };

  const handleSubmit = () => {
    const x = {
      id: uuidv4().substring(0, 8),
      family_id: user.id,
      request_type: Number(requestType),
      description: description,
      city_id: cities.find((city) => city.city_name == user?.city)?.id,
      status_id: 1,
      is_urgent: isUrgent,
      created_at: new Date(),
      requiers_vihicle: requiresVihcle,
    };
    console.log(x);

    const newErrors = {
      title: !title,
      requestType: !requestType,
      date: !date,
      description: !description,
    };
    setErrors(newErrors);

    if (!validateForm()) return;

    user &&
      axiosInstance
        .post("/api/request", x)
        .then((response) => {
          setMassage("Form submitted successfully!");
          console.log(response);
        })
        .catch((err) => {
          setMassage("Error: " + err.message);
          console.log(err);
        });

    setShowMassage(true);
    handleClose();
  };

  return (
    <Box sx={{ direction: "rtl" }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: themeColors.orange,
          mt: 3,
          borderRadius: "20px",
          px: 4,
          py: 1.5,
          fontSize: "1.1rem",
        }}
        onClick={handleOpen}
      >
        פתיחת בקשה חדשה
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          פתיחת בקשה חדשה
        </DialogTitle>
        <DialogContent>
          <Tooltip title="!!בקשה דחופה">
            <FormControlLabel
              control={
                <Switch
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  color="error"
                />
              }
              label="בקשה דחופה"
              dir="rtl"
            />
          </Tooltip>
          <TextField
            fullWidth
            label="כותרת הבקשה"
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            helperText={errors.title ? "שדה חובה" : ""}
            dir="rtl"
          />
          <TextField
            select
            label="תחום"
            sx={{ minWidth: "100%" }}
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id.toString()}>
                {type.type_name}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="תאריך"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "dense",
                  error: errors.date,
                  helperText: errors.date ? "שדה חובה" : "",
                  dir: "ltr",
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="פירוט הבקשה"
            margin="dense"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={errors.description}
            helperText={errors.description ? "שדה חובה" : ""}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={requiresVihcle}
                onChange={(e) => setRequiresVihcle(e.target.checked)}
                color="primary"
              />
            }
            label="דרוש רכב"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            ביטול
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!validateForm()}
          >
            שליחה
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={showMassage}
        autoHideDuration={3000}
        onClose={() => setShowMassage(false)}
      >
        <Alert
          onClose={() => setShowMassage(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {massage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NewRequestForm;
