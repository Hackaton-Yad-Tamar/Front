import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Calendar as CalendarIcon, MapPin, X } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Request } from "../types/requestType";

// Types
export interface Meeting {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location: string;
}

// Styled Components
const StyledCalendarWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  height: "calc(100vh - 40px)",
  margin: theme.spacing(2),
  overflow: "hidden",
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

// Calendar Messages
const messages = {
  today: "היום",
  previous: "חזור",
  next: "הבא",
  month: "חודש",
  week: "שבוע",
  day: "יום",
  agenda: "אג'נדה",
  date: "תאריך",
  time: "שעה",
  event: "אירוע",
  noEventsInRange: "אין אירועים בטווח זה",
  showMore: (total: number) => `+ עוד ${total}`,
};

const MUICalendar = ({ familyRequests }: { familyRequests: Request[] }) => {
  const [selectedEvent, setSelectedEvent] = useState<Meeting | null>(null);
  const localizer = momentLocalizer(moment);

  const meetings = familyRequests.map<Meeting>((request) => ({
    id: request.id,
    title: request.description,
    start: request.preferedDatetime,
    end: request.expertCompletion,
    location: request.city,
  }));

  const handleEventSelect = (event: Meeting) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  const handleAddToGoogleCalendar = (event: Meeting) => {
    const startTime = moment(event.start).format("YYYYMMDDTHHmmss");
    const endTime = moment(event.end).format("YYYYMMDDTHHmmss");

    const googleCalendarUrl = new URL("https://calendar.google.com/calendar/render");
    googleCalendarUrl.searchParams.append("action", "TEMPLATE");
    googleCalendarUrl.searchParams.append("text", event.title);
    googleCalendarUrl.searchParams.append("dates", `${startTime}/${endTime}`);
    googleCalendarUrl.searchParams.append("details", `${event.title}`);
    googleCalendarUrl.searchParams.append("location", event.location);

    window.open(googleCalendarUrl.toString(), "_blank");
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: "#6366f1",
      borderRadius: "8px",
      opacity: 0.8,
      color: "white",
      border: "none",
      display: "block",
      padding: "4px",
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f6f8ff 0%, #f0f3ff 100%)",
        padding: 2,
      }}
    >
      <StyledCalendarWrapper>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "#1a237e" }}>
          לוח פגישות
        </Typography>

        <Calendar
          localizer={localizer}
          events={meetings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100% - 60px)" }}
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventSelect}
          popup
          rtl
        />
      </StyledCalendarWrapper>

      <Dialog
        open={!!selectedEvent}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 2,
          },
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1,
              }}
            >
              <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
                {selectedEvent.title}
              </Typography>
              <IconButton onClick={handleCloseDialog} size="small">
                <X />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <InfoRow>
                <MapPin />
                <Typography>{selectedEvent.location}</Typography>
              </InfoRow>
            </DialogContent>

            <DialogActions sx={{ padding: 3 }}>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => handleAddToGoogleCalendar(selectedEvent)}
                  variant="outlined"
                  startIcon={<CalendarIcon size={20} />}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 4,
                    gap: 2,
                  }}
                >
                  הוסף ליומן Google
                </Button>
                <Button
                  onClick={handleCloseDialog}
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 4,
                  }}
                >
                  סגור
                </Button>
              </Stack>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MUICalendar;
