import {
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { themeColors } from "../../../App";
import axiosInstance from "../../../axios";
import { AllRequest, RequestStatus, RequestType } from "../../../types/request";
import RequestCard from "../components/RequestCard";
import { useUser } from "../../../contexts/userContext";


const MyRequests: React.FC = () => {
    const [requests, setRequests] = useState<AllRequest[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<AllRequest[]>([]);
    const [filterDate, setFilterDate] = useState<string>();
    const [types, setTypes] = useState<RequestType[]>([]);
    const [statuses, setStatuses] = useState<RequestStatus[]>([]);
    const [filterType, setFilterType] = useState<string>("");
    const [showOpenRequests, setShowOpenRequests] = useState<boolean>(false);
    const { user } = useUser();

    useEffect(() => {
        axiosInstance.get<AllRequest[]>("/request")
            .then((response) => {
                user && setRequests(response.data.filter((request) => request.request.family_id.includes(user.id)));
                user && setFilteredRequests(response.data.filter((request) => request.request.family_id.includes(user.id)));
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
                (!filterDate || dayjs(request.request.created_at).format("YYYY-MM-DD") === filterDate) &&
                (!filterType || request.request_type.id.toString() === filterType)
            );
        });
        setFilteredRequests(filterRequests);
    }, [filterDate, filterType, requests]);

    const deleteRequest = (reqId: string) => {
        axiosInstance.delete('request/' + reqId).then().catch((error) => console.error(error));
    }


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
                        sx={{ background: "#f0f8ff", padding: "5px 10px", borderRadius: "8px", marginX: 1 }}
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
                    {filteredRequests.map((request, index) =>
                        <RequestCard key={index} allRequest={request} deleteRequest={deleteRequest} />
                    )}
                </Grid>
            </Box>

        </Box>
    );
};

export default MyRequests;