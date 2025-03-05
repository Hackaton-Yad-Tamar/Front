import {
  Box,
  Button,
  Checkbox,
  Container,
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
import RequestBlock from "../components/requestBlock";
import mockRequest from "../../../mockRequest";

const MyRequests: React.FC = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        flexGrow: 1,
        py: 6,
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
        sx={{
          color: themeColors.darkBlue,
        }}
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Checkbox />}
            label="הצג רק בקשות פתוחות"
          />
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
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
          <RequestBlock request={mockRequest} />
        </Grid2>
      </Box>
    </Container>
  );
};

export default MyRequests;
