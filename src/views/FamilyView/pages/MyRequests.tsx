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
import React, { useEffect, useState } from "react";
import { themeColors } from "../../../App";
import { AccessTimeOutlined, Dangerous, DescriptionOutlined, Notifications, NotificationsActive, PriorityHigh, ReportProblem } from "@mui/icons-material";
import axiosInstance from "../../../axios";
import { MyRequest } from "../../../types/request";
import dayjs from "dayjs";

const MyRequests: React.FC = () => {
    const [requests, setRequests] = useState<MyRequest[]>([])

    useEffect(() => {
        axiosInstance.get<MyRequest[]>("/request")
            .then((response) => setRequests(response.data))
            .catch((error) => console.error(error));
    }, []);

    const formatDateTime = (isoString: string) => {
        return dayjs(isoString).format("YYYY-MM-DD HH:mm");
    };

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
                    {requests.map((request, index) => (
                        <Grid2 size={4} key={index}>
                            <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}>
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
                                            backgroundColor:
                                                index % 2 === 0 ? themeColors.lightGreen : themeColors.lightBlue,
                                        }}
                                    >
                                        {index % 2 === 0 ? "פתוח" : "בטיפול"}
                                    </Button>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box alignItems={'center'} display={'flex'}>
                                    <DescriptionOutlined />
                                    <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                                        {request.description}
                                    </Typography>
                                </Box>
                                <Box alignItems={'center'} display={'flex'}>
                                    <AccessTimeOutlined />
                                    <Typography variant="h6" color="textSecondary" textAlign="right" marginRight={2}>
                                        {formatDateTime(request.created_at)}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </Box>
    );
};

export default MyRequests;
