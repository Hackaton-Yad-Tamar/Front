import { useState } from "react";
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
import { RequestType, requestTypeList } from "../types/requestType";
import { themeColors } from "../App";

const NewRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [details, setDetails] = useState("");
  const [sos, setSos] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [errors, setErrors] = useState({
    title: false,
    domain: false,
    date: false,
    details: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDate(null);
    setDetails("");
    setDomain("");
    setTitle("");
    setSos(false);
  };

  const validateForm = () => {
    return title && domain && date && details;
  };

  const handleSubmit = () => {
    const newErrors = {
      title: !title,
      domain: !domain,
      date: !date,
      details: !details,
    };
    setErrors(newErrors);

    if (!validateForm()) return;

    console.log({ title, domain, date, details });
    setSuccessMessage(true)
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
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            error={errors.domain}
            helperText={errors.domain ? "שדה חובה" : ""}
          >
            {requestTypeList.map((type) => (
              <MenuItem value={type} id={type}>{RequestType[type]}</MenuItem>
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
                  dir: "ltr"
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
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            error={errors.details}
            helperText={errors.details ? "שדה חובה" : ""}
          />
          <Tooltip title="!!בקשה דחופה">
            <FormControlLabel
              control={
                <Switch
                  checked={sos}
                  onChange={(e) => setSos(e.target.checked)}
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
      <Snackbar open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}>
        <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
          בקשה נשלחה בהצלחה!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NewRequestForm;
