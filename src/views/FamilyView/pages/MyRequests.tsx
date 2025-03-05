import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { themeColors } from "../../../App";
import { Dangerous, Notifications, NotificationsActive, PriorityHigh, ReportProblem } from "@mui/icons-material";

const requests = [
    {
        id: "REQ1001",
        family_id: 201,
        request_type: "food",
        description: "Need grocery supplies for a family of 4",
        city_id: 3,
        status_id: 1,
        is_urgent: true,
        assigned_volunteer_id: 101,
        expected_completion: "2025-03-06T10:30:00.000Z",
        preferred_datetime: "2025-03-06T09:00:00.000Z",
        created_at: "2025-03-05T14:00:00.000Z",
    },
    {
        id: "REQ1002",
        family_id: 202,
        request_type: "medical",
        description: "Elderly person needs prescription delivery",
        city_id: 5,
        status_id: 2,
        is_urgent: false,
        assigned_volunteer_id: 102,
        expected_completion: "2025-03-07T12:00:00.000Z",
        preferred_datetime: "2025-03-07T10:30:00.000Z",
        created_at: "2025-03-05T16:30:00.000Z",
    },
    {
        id: "REQ1003",
        family_id: 203,
        request_type: "transport",
        description: "Need transportation to hospital for check-up",
        city_id: 7,
        status_id: 1,
        is_urgent: true,
        assigned_volunteer_id: 103,
        expected_completion: "2025-03-05T18:00:00.000Z",
        preferred_datetime: "2025-03-05T17:30:00.000Z",
        created_at: "2025-03-05T12:15:00.000Z",
    },
    {
        id: "REQ1004",
        family_id: 204,
        request_type: "home repair",
        description: "Fixing a broken window for a senior citizen",
        city_id: 2,
        status_id: 3,
        is_urgent: false,
        assigned_volunteer_id: 104,
        expected_completion: "2025-03-10T15:00:00.000Z",
        preferred_datetime: "2025-03-10T13:00:00.000Z",
        created_at: "2025-03-04T09:00:00.000Z",
    },
    {
        id: "REQ1005",
        family_id: 205,
        request_type: "education",
        description: "Looking for a tutor to help a child with math",
        city_id: 6,
        status_id: 1,
        is_urgent: false,
        assigned_volunteer_id: 105,
        expected_completion: "2025-03-08T17:00:00.000Z",
        preferred_datetime: "2025-03-08T15:30:00.000Z",
        created_at: "2025-03-05T11:45:00.000Z",
    },
    {
        id: "REQ1006",
        family_id: 206,
        request_type: "food",
        description: "Single parent needs baby food and essentials",
        city_id: 4,
        status_id: 2,
        is_urgent: true,
        assigned_volunteer_id: 106,
        expected_completion: "2025-03-06T08:00:00.000Z",
        preferred_datetime: "2025-03-06T07:30:00.000Z",
        created_at: "2025-03-05T13:20:00.000Z",
    },
    {
        id: "REQ1007",
        family_id: 207,
        request_type: "companionship",
        description: "Elderly woman needs someone to talk to for an hour",
        city_id: 9,
        status_id: 1,
        is_urgent: false,
        assigned_volunteer_id: 107,
        expected_completion: "2025-03-09T11:00:00.000Z",
        preferred_datetime: "2025-03-09T10:30:00.000Z",
        created_at: "2025-03-05T15:10:00.000Z",
    },
];


const MyRequests: React.FC = () => {
        <Box sx={{ flexGrow: 1, my: 6, direction: "rtl" }}>
  return (
    <Box
      sx={{
        height: "100%",
        direction: "rtl",
        padding: "3rem",
        background: "linear-gradient(to bottom, #a5ddf7, #78c2f2)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        sx={{ textShadow: "4px 4px 8px rgba(0, 0, 0, 0.3)", color: "white" }}
      >
        הבקשות שלי
      </Typography>
      <Box
        sx={{
          background: "white",
          padding: "1rem",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, alignItems: "center" }}>
          <FormControlLabel control={<Checkbox />} label="הצג רק בקשות פתוחות" />
          <TextField select label="סינון לפי סטטוס" sx={{ minWidth: 200 }}>
            <MenuItem value="open">פתוח</MenuItem>
            <MenuItem value="closed">סגור</MenuItem>
          </TextField>
          <TextField select label="סינון לפי תחום" sx={{ minWidth: 200 }}>
            <MenuItem value="health">שירותי בריאות</MenuItem>
            <MenuItem value="transport">הסעות</MenuItem>
          </TextField>
          <TextField
            label="תאריך"
            type="date"
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200 }}
          />
        </Box>
        <Grid2 container spacing={3}>
          {[
            "חברה לקשישה",
            "ליווי לבדיקה בבית חולים",
            "הסעה לקניון",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
            "עזרה בקניות בסופרמרקט",
          ].map((title, index) => (
            <Grid2 size={4} key={index}>
              <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    textAlign="right"
                    sx={{ color: themeColors.darkBlue }}
                  >
                    {title}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      borderRadius: "20px",
                      backgroundColor:
                        index % 2 === 0 ? themeColors.lightGreen : themeColors.lightBlue,
                    }}
                  >
                    {index % 2 === 0 ? "פתוח" : "בטיפול"}
                  </Button>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="textSecondary" textAlign="right">
                  תיאור קצר של הבקשה
                </Typography>
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default MyRequests;
