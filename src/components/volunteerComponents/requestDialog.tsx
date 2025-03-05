import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RequestDialogProps } from "../../types/request.types";

const RequestDialog: React.FC<RequestDialogProps> = ({ open, onClose, emergency }) => {
  if (!emergency) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "right" }}>פרטי החירום</DialogTitle>
      <DialogContent sx={{ direction: "rtl", textAlign: "right" }}>
        <Typography><strong>שם:</strong> {emergency.name}</Typography>
        <Typography><strong>סוג חירום:</strong> {emergency.emergencyType}</Typography>
        <Typography><strong>מקום:</strong> {emergency.location}</Typography>
        <Typography><strong>חומרה:</strong> {emergency.severity}</Typography>
        <Typography><strong>סטטוס תגובה:</strong> {emergency.responseStatus}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">סגור</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;
