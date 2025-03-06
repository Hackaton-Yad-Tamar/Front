import { AccessTimeOutlined, CarCrash, DescriptionOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import { themeColors } from "../../../App";
import RequestDialog from "../components/RequestDialog";
import { useState } from "react";
import { MyRequest } from "../../../types/request";
import dayjs from "dayjs";

const RequestCard = ({request} : {request : MyRequest}) => {
    const [openRequestDialog, setOpenRequestDialog] = useState(false)

    const formatDateTime = (isoString: string) => {
        return dayjs(isoString).format("YYYY-MM-DD HH:mm");
    };

    return (
        <Grid item xs={12} md={4} key={request.id}>
            <RequestDialog open={openRequestDialog} setOpen={setOpenRequestDialog} request={request} />
            <Paper
                sx={{
                    p: 3,
                    borderRadius: "10px",
                    boxShadow: 3,
                    position: "relative",
                    ...(request.is_urgent && { border: "2px solid red" })
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
                        {request.request_type_relation.type_name}
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            alignSelf: "start",
                            borderRadius: "20px",
                            // backgroundColor:
                                //  % 2 === 0 ? themeColors.lightGreen : themeColors.lightBlue,
                        }}
                    >
                        {/* {index % 2 === 0 ? "פתוח" : "בטיפול"} */}
                    </Button>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box alignItems="center" display="flex">
                    <DescriptionOutlined />
                    <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                        {request.description}
                    </Typography>
                </Box>

                <Box alignItems="center" display="flex">
                    <AccessTimeOutlined />
                    <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                        {formatDateTime(request.created_at)}
                    </Typography>
                </Box>

                {request.requires_vehicle &&
                    <Box alignItems="center" display="flex">
                        <CarCrash />
                        <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                            נדרש רכב
                        </Typography>
                    </Box>
                }

                {request.is_urgent && (
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