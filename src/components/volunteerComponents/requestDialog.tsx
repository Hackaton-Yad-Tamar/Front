import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RequestDialogProps } from "../../types/request.types";
import { Box } from "@mui/material";

const RequestDialog: React.FC<RequestDialogProps> = ({ open, onClose, emergency }) => {
  if (!emergency) return null;

  const title = emergency.emergencyType === "sos" ? "בקשת SOS" : "בקשה רגילה";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        minHeight: 500,
        "fontFamily": "Rubik, sans-serif",
      }}
    >
      <DialogTitle sx={{
        display: 'flex', alignItems: 'center', direction: "rtl", backgroundColor: "#e1f5fe", "fontFamily": "Rubik, sans-serif",
      }}>
        <img
          src="https://yadtamar.org.il/wp-content/uploads/2020/05/menu-logo-small.png"
          alt="Emergency Icon"
          style={{ width: 40, height: 40, alignItems: "end" }}

        />
      </DialogTitle>
      <DialogContent
        sx={{
          "fontFamily": "Rubik, sans-serif",
          direction: "rtl",
          textAlign: "right",
          padding: "10px 20px",
          backgroundColor: "#e1f5fe",
          maxHeight: "400px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#00AEEE",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e1f5fe",
          },
        }}
      >
        <Typography sx={{ "fontFamily": "Rubik, sans-serif", direction: "rtl", textAlign: "right", color: "#00AEEE" }} variant="h6">{title}</Typography>
        <Box sx={{ paddingRight: '20px', "fontFamily": "Rubik, sans-serif", }}>
          <Box mb={2}>
            <Typography sx={{ color: "#324A6D", "fontFamily": "Rubik, sans-serif", }}><strong>שם:</strong></Typography>
            <Typography>{emergency.name}</Typography>
          </Box>
          <Box mb={2}>
            <Typography sx={{ color: "#324A6D" }}><strong>אזור:</strong></Typography>
            <Typography>{emergency.location}</Typography>
          </Box>
          <Box mb={2}>
            <Typography sx={{ color: "#324A6D" }}><strong>תיאור:</strong></Typography>
            <Typography>{emergency.description}</Typography>
          </Box>
          <Box mb={2}>
            <Typography sx={{ color: "#324A6D" }}><strong>סוג חירום:</strong></Typography>
            <Typography>{emergency.emergencyType}</Typography>
          </Box>
          <Box mb={2}>
            <Typography sx={{ color: "#324A6D" }}><strong>חומרה:</strong></Typography>
            <Typography>{emergency.severity}</Typography>
          </Box>
          <Box mb={2}>
            <Typography sx={{ color: "#324A6D" }}><strong>סטטוס תגובה:</strong></Typography>
            <Typography>{emergency.responseStatus}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{
        justifyContent: 'flex-start', backgroundColor: "#e1f5fe",
      }}>
        <Button onClick={onClose} color="primary" sx={{ backgroundColor: '#00AEEE', color: 'white', borderRadius: "20px" }}>
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;
