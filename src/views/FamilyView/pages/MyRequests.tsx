import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { themeColors } from "../../../App";

const MyRequests: React.FC = () => {
    return (
        <Container sx={{ flexGrow: 1, my: 6, direction: "rtl" }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: themeColors.lightBlue }}>
                הבקשות שלי
            </Typography>
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
                <TextField label="תאריך" type="date" InputLabelProps={{ shrink: true }} sx={{ minWidth: 200 }} />
            </Box>
            <Grid container spacing={3}>
                {["חברה לקשישה", "ליווי לבדיקה בבית חולים", "הסעה לקניון", "עזרה בקניות בסופרמרקט"].map((title, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper sx={{ p: 3, borderRadius: "10px", boxShadow: 3 }}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6" fontWeight="bold" textAlign="right" sx={{ color: themeColors.darkBlue }}>{title}</Typography>
                                <Button variant="contained" sx={{ alignSelf: "start", borderRadius: "20px", backgroundColor: index % 2 === 0 ? themeColors.lightGreen : themeColors.lightBlue }}>
                                    {index % 2 === 0 ? "פתוח" : "בטיפול"}
                                </Button>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" color="textSecondary" textAlign="right">תיאור קצר של הבקשה</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyRequests;