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
import { AllRequest, MyRequest } from "../../../types/request";
import axiosInstance from "../../../axios";

interface RequestDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    request: AllRequest;
    deleteRequest: (reqId: string) => void;
}

const RequestDialog: React.FC<RequestDialogProps> = ({
    open,
    setOpen,
    request,
    deleteRequest
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
                {request.request_type.type_name}
            </DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" gap={1}>
                    <Category fontSize="small" />
                    <Typography variant="subtitle2" color="textSecondary">
                        תחום: {request.request_type.type_name}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <AccessTime fontSize="small" />
                    <Typography variant="subtitle2" color="textSecondary">
                        תאריך: {request.request.created_at}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    {request.request.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <DirectionsCar fontSize="small" />
                    <Typography variant="subtitle2" color="textSecondary">
                        {request.request.requires_vehicle ? "נדרש רכב" : "לא נדרש רכב"}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Chip
                        label={request.status.status_name}
                    />
                </Box>
                {/* {request.status !== RequestStatus.Done && (
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <Button
              color="success"
              variant="outlined"
              sx={{ borderRadius: "10px" }}
            >
              שנה סטטוס לטופל
            </Button>
          </FormControl>
        )} */}
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
                    onClick={() => deleteRequest(request.request.id)}
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