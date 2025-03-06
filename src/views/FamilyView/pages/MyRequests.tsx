import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { themeColors } from "../../../App";
import { AccessTimeOutlined, CarCrash, DescriptionOutlined } from "@mui/icons-material";
import axiosInstance from "../../../axios";
import { MyRequest, RequestStatus, RequestType } from "../../../types/request";
import dayjs from "dayjs";

const MyRequests: React.FC = () => {
    const [requests, setRequests] = useState<MyRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<MyRequest[]>([]);
    const [filterDate, setFilterDate] = useState<string>();
    const [types, setTypes] = useState<RequestType[]>([]);
    const [statuses, setStatuses] = useState<RequestStatus[]>([]);
    const [filterType, setFilterType] = useState<string>("");
    const [showOpenRequests, setShowOpenRequests] = useState<boolean>(false);

    useEffect(() => {
        axiosInstance.get<MyRequest[]>("/request")
            .then((response) => {
                setRequests(response.data);
                setFilteredRequests(response.data);
            })
            .catch((error) => console.error(error));

        axiosInstance.get<RequestType[]>("/request_type")
            .then((response) => {
                setTypes(response.data);
            })
            .catch((error) => console.error(error));

        axiosInstance.get<RequestStatus[]>("/request_status")
            .then((response) => {
                setStatuses(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const filterRequests = requests.filter((request) => {
            return (
                (!filterDate || dayjs(request.created_at).format("YYYY-MM-DD") === filterDate) &&
                (!filterType || request.request_type_relation.id.toString() === filterType)
            );
        });
        setFilteredRequests(filterRequests);
    }, [filterDate, filterType, requests]);

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
                {/* שדות סינון */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3, alignItems: "center" }}>
                    <FormControlLabel
                        control={<Checkbox checked={showOpenRequests} onChange={(e) => setShowOpenRequests(e.target.checked)} />}
                        label={<Typography sx={{ fontWeight: "bold", color: themeColors.darkBlue }}>הצג רק בקשות פתוחות</Typography>}
                        sx={{ background: "#f0f8ff", padding: "5px 10px", borderRadius: "8px" ,marginX:1}}
                    />
                    <TextField select label="סינון לפי סטטוס" sx={{ minWidth: 200 }}>
                        {statuses.map((status) => (
                            <MenuItem key={status.id} value={status.id.toString()}>{status.status_name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="סינון לפי תחום"
                        sx={{ minWidth: 200 }}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">הכל</MenuItem>
                        {types.map((type) => (
                            <MenuItem key={type.id} value={type.id.toString()}>{type.type_name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="תאריך יצירה"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 200 }}
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </Box>

                {/* הצגת רשימת בקשות */}
                <Grid container spacing={3}>
                    {filteredRequests.map((request, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: "10px",
                                    boxShadow: 3,
                                    position: "relative",
                                    ...(request.is_urgent && { border: "2px solid red" })
                                }}
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
                                            backgroundColor:
                                                index % 2 === 0 ? themeColors.lightGreen : themeColors.lightBlue,
                                        }}
                                    >
                                        {index % 2 === 0 ? "פתוח" : "בטיפול"}
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
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default MyRequests;