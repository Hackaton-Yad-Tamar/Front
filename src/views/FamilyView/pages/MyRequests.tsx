import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { themeColors } from "../../../App";
import RequestBlock from "../components/requestBlock";
import mockRequest from "../../../mockRequest";

const MyRequests: React.FC = () => {
  return (
    <Container sx={{ flexGrow: 1, my: 6, direction: "rtl" }}>
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
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
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
      <Grid container spacing={3}>
        <RequestBlock request={mockRequest} />
        <RequestBlock request={mockRequest} />
        <RequestBlock request={mockRequest} />
        <RequestBlock request={mockRequest} />
      </Grid>
    </Container>
  );
};

export default MyRequests;
