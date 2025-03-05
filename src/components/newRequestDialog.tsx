import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const NewRequestForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [details, setDetails] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log({ title, domain, date, details });
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" sx={{ bgcolor: "orange" }} onClick={handleOpen}>
        פתח בקשה חדשה
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
          />
          <TextField
            fullWidth
            select
            label="תחום"
            margin="dense"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <MenuItem value="option1">אופציה 1</MenuItem>
            <MenuItem value="option2">אופציה 2</MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="תאריך"
              value={date}
              onChange={(newValue) => setDate(newValue)}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">ביטול</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">שליחה</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewRequestForm;
