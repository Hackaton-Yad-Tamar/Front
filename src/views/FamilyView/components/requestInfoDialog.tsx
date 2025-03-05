import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  Box,
  Chip,
} from "@mui/material";
import { DirectionsCar, AccessTime, Category } from "@mui/icons-material";
import { RequestStatus, Request } from "../../../types/requestType";

interface RequestDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  request: Request;
}

export const getRequestStatusColor = (status: string) => {
  switch (status) {
    case RequestStatus.Searching:
      return "secondary";
    case RequestStatus.Waiting:
      return "primary";
    case RequestStatus.InProgress:
      return "warning";
    case RequestStatus.Done:
      return "success";
  }
};

const RequestDialog: React.FC<RequestDialogProps> = ({
  open,
  setOpen,
  request,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "#007bff" }}>
        {request.title}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" gap={1}>
          <Category fontSize="small" />
          <Typography variant="subtitle2" color="textSecondary">
            תחום: {request.requestType}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <AccessTime fontSize="small" />
          <Typography variant="subtitle2" color="textSecondary">
            תאריך: {request.createdAt.toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {request.description}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <DirectionsCar fontSize="small" />
          <Typography variant="subtitle2" color="textSecondary">
            {request.carNeeded ? "נדרש רכב" : "לא נדרש רכב"}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Chip
            label={request.status}
            color={getRequestStatusColor(request.status)}
          />
        </Box>
        {request.status !== RequestStatus.Done && (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <Button
              color="success"
              variant="outlined"
              sx={{ borderRadius: "10px" }}
            >
              שנה סטטוס לטופל
            </Button>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="primary"
          variant="contained"
        >
          סגור
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
          color="error"
          variant="outlined"
          sx={{ mr: "3px" }}
        >
          מחק בקשה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;
