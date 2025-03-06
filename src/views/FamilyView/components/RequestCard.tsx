import { AccessTimeOutlined, CarCrash, DescriptionOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { themeColors } from "../../../App";
import { AllRequest } from "../../../types/request";
import RequestDialog from "../components/RequestDialog";

const RequestCard = ({ allRequest, deleteRequest, closeRequest }: { allRequest: AllRequest, deleteRequest: (reqId: string) => void, closeRequest: (reqId: string) => void }) => {
    const [openRequestDialog, setOpenRequestDialog] = useState(false)

    const formatDateTime = (isoString: string) => {
        return dayjs(isoString).format("YYYY-MM-DD HH:mm");
    };

    return (
        <Grid item xs={12} md={4} key={allRequest.request.id}>
            <RequestDialog open={openRequestDialog} setOpen={setOpenRequestDialog} request={allRequest} closeRequest={closeRequest} deleteRequest={deleteRequest} />
            <Paper
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    boxShadow: 3,
                    position: "relative",
                    ...(allRequest.request.is_urgent && { border: "2px solid red" })
                }}
                onClick={() => { setOpenRequestDialog(true) }}
            >
                <Box display="flex" justifyContent="space-between">
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        textAlign="right"
                        sx={{ color: themeColors.darkBlue }}
                    >
                        {allRequest.request_type.type_name}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            alignSelf: "start",
                            borderRadius: "20px",
                            backgroundColor: '#' + allRequest.status.status_color
                        }}
                    >
                        {allRequest.status.status_name}
                    </Button>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box alignItems="center" display="flex">
                    <DescriptionOutlined />
                    <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                        {allRequest.request.description}
                    </Typography>
                </Box>

                <Box alignItems="center" display="flex">
                    <AccessTimeOutlined />
                    <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                        {formatDateTime(allRequest.request.created_at)}
                    </Typography>
                </Box>

                {allRequest.request.requires_vehicle &&
                    <Box alignItems="center" display="flex">
                        <CarCrash />
                        <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                            נדרש רכב
                        </Typography>
                    </Box>
                }

                {allRequest.request.is_urgent && (
                    <Typography
                        color="red"
                        variant="h6"
                        sx={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            fontWeight: "bold",
                        }}
                    >
                        דחוף
                    </Typography>
                )}
            </Paper>
        </Grid>
    )
}

export default RequestCard