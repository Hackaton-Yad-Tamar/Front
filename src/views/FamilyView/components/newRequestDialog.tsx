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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  RequestType,
  requestTypeList,
  requestTypeMapper,
} from "../../../types/requestType";
import { themeColors } from "../../../App";
import axiosInstance from "../../../axios";
import { mockUser } from "../../../mockUser";

const NewRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [requestType, setRequestType] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [showMassage, setShowMassage] = useState(false);
  const [massage, setMassage] = useState("");

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

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axiosInstance
      .get("/api/request") // Replace '/data' with your actual API endpoint
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSubmit = () => {
    const newErrors = {
      title: !title,
      requestType: !requestType,
      date: !date,
      description: !description,
    };
    setErrors(newErrors);

    if (!validateForm()) return;

    axiosInstance
      .post("/api/request", {
        family_id: mockUser.id,
        request_type: requestType,
        description: description,
        city_id: mockUser.city,
        status_id: 1,
        is_urgent: isUrgent,
        created_at: new Date(),
      })
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
    <div>
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
          <TextField
            fullWidth
            label="כותרת הבקשה"
            margin="dense"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            helperText={errors.title ? "שדה חובה" : ""}
          />
          <TextField
            fullWidth
            select
            label="תחום"
            margin="dense"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            error={errors.description}
            helperText={errors.description ? "שדה חובה" : ""}
          >
            {requestTypeList.map((type) => {
              return (
                <MenuItem value={RequestType[type]} id={type}>
                  {requestTypeMapper[RequestType[type]]}
                </MenuItem>
              );
            })}
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
          <Tooltip title="!!בקשה דחופה">
            <FormControlLabel
              control={
                <Switch
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  color="error"
                />
              }
              label="SOS"
            />
          </Tooltip>
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
    </div>
  );
};

export default NewRequestForm;
