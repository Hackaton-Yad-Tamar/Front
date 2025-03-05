import { Box, Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import React, { useEffect, useState } from "react";
import RequestsList from "./requestsList";

const RequestPage = () => {
    const [regularRequests, setRegularRequests] = useState([
        { name: "צ'רלי בראון", isUrgent: true, emergencyType: "פציעה משריפה", location: "בת ים", severity: "בינוני", responseStatus: "טופל", sos: true },
        { name: "דיויד מילר", isUrgent: false, emergencyType: "טביעה", location: "ראשון לציון", severity: "קריטי", responseStatus: "ממתין" },
        { name: "אמה וילסון", isUrgent: false, emergencyType: "שבר", location: "נס ציונה", severity: "קל", responseStatus: "בתהליך" },
        { name: "צ'רלי בראון", isUrgent: true, emergencyType: "פציעה משריפה", location: "בת ים", severity: "בינוני", responseStatus: "טופל" },
        { name: "דיויד מילר", isUrgent: true, emergencyType: "טביעה", location: "ראשון לציון", severity: "קריטי", responseStatus: "ממתין" },
        { name: "אמה וילסון", isUrgent: true, emergencyType: "שבר", location: "נס ציונה", severity: "קל", responseStatus: "בתהליך" },
    ]);

    const [isAiClicked, setIsAiClicked] = useState(false); // Track if the AI button is clicked

    const handleAiButtonClick = () => {
        setIsAiClicked((prevState) => !prevState); // Toggle AI button state
        if (!isAiClicked) {
            // Reset fields when turning on the AI mode
            setCategory('');
            setArea('');
            setSelectedDate('');
        }
    };

    const [map, setMap] = useState<Map | null>(null);
    const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);
    // const filteredRequests = regularRequests.filter((request) => {
    //     const isCategoryMatch = category ? request.emergencyType === category : true;
    //     const isAreaMatch = area ? request.location === area : true;
    //     // const isDateMatch = selectedDate ? new Date(request.date).toLocaleDateString() === selectedDate : true;
        
    //     return isCategoryMatch && isAreaMatch;
    // });

    useEffect(() => {
        const israelCenter = fromLonLat([34.8516, 31.0461]);
        const newVectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
            source: newVectorSource,
        });

        const newMap = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            view: new View({
                center: israelCenter,
                zoom: 7,
            }),
        });

        setMap(newMap);
        setVectorSource(newVectorSource);

        
        return () => newMap.setTarget(null);
    }, []);

    const createFeature = (lon: number, lat: number, properties: Record<string, any> = {}) => {
        if (!vectorSource) return null;

        const point = new Point(fromLonLat([lon, lat]));
        const feature = new Feature({
            geometry: point,
            ...properties,
        });

        vectorSource.addFeature(feature);
        return feature;
    };

    const addLocationToMap = async (name: string) => {
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.length > 0) {
                const { lat, lon } = data[0];
                createFeature(parseFloat(lon), parseFloat(lat), { name });
                return [lat, lon] as [string, string];
            }
        } catch (error) {
            console.error("Geocoding error:", error);
        }
        return null;
    };

    const [category, setCategory] = React.useState('');
    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const [area, setArea] = React.useState('');
    const handleChangeArea = (event: SelectChangeEvent) => {
        setArea(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState<string>("");
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        if (map && vectorSource) {
            regularRequests.forEach((request) => addLocationToMap(request.location));
        }
    }, [map, regularRequests, vectorSource]);

    return (
        <Box sx={{ display: "flex", height: "86vh", overflow: "hidden", direction: 'ltr' }}>
            <Box sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F3FBFF", borderWidth: "10px" }}>
                <div id="map" style={{
                    width: "70%", height: "90%", borderRadius: "10px", borderColor: "white",
                    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
                    overflow: "hidden"
                }}></div>
            </Box>

            <Box sx={{ width: "50%", height: "100%", padding: 2, overflowY: "auto", backgroundColor: "#F3FBFF" }}>
                <Grid container sx={{ justifyContent: "space-between", p: 2, direction: "rtl", alignItems: "flex-end" }}>
                    <Grid item xs={12} sm={4} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>תחום</InputLabel>
                            <Select
                                labelId="category-label"
                                value={category}
                                onChange={handleChangeCategory}
                                disabled={isAiClicked} // Disable when AI button is clicked
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "25px",
                                    height: "50px",
                                    textAlign: "right",
                                    direction: "rtl",
                                    display: "flex",
                                    alignItems: "center",
                                    "& .MuiSelect-select": {
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: { borderRadius: "15px", overflow: "hidden" },
                                    },
                                }}
                            >
                                <MenuItem value=""><em>לא נבחר</em></MenuItem>
                                <MenuItem value="work">אינסטלטור</MenuItem>
                                <MenuItem value="w">טכנאי</MenuItem>
                                <MenuItem value="w2">רופא</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="area-label">אזור</InputLabel>
                            <Select
                                labelId="area-label"
                                value={area}
                                onChange={handleChangeArea}
                                disabled={isAiClicked} // Disable when AI button is clicked
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "25px",
                                    height: "50px",
                                    borderColor: "white",
                                    textAlign: "right",
                                    direction: "rtl",
                                    display: "flex",
                                    boxShadow: 'none',
                                    border: 0,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    "& .MuiSelect-select": {
                                        borderColor: "white",
                                        paddingTop: 0,
                                        paddingBottom: 0,
                                        display: "flex",
                                        alignItems: "center",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(0, 0, 0, 0.54)",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            borderColor: "white",
                                            borderRadius: "15px", overflow: "hidden"
                                        },
                                    },
                                }}
                            >
                                <MenuItem value=""><em>לא נבחר</em></MenuItem>
                                <MenuItem value="work">ראשון לציון</MenuItem>
                                <MenuItem value="w">תל אביב</MenuItem>
                                <MenuItem value="w2">נס ציונה</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* תאריך */}
                    <Grid item xs={12} sm={4} md={3}>
                        <FormControl fullWidth>
                            <TextField
                                id="date-picker"
                                label="תאריך"
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                disabled={isAiClicked} // Disable when AI button is clicked
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "25px",
                                    height: "50px",
                                    textAlign: "right",
                                    direction: "rtl",
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "25px",
                                        height: "50px",
                                        "&.Mui-focused": {
                                            borderColor: "transparent",
                                            boxShadow: "none",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(0, 0, 0, 0.54)",
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "end" }}>
                        <Button
                            sx={{
                                backgroundColor: isAiClicked ? '#324A6D' : 'white',
                                color: isAiClicked ? 'white' : 'black',
                                borderRadius: "25px",
                                height: "50px",
                                padding: "0 16px",
                                textAlign: "center",
                                direction: "rtl",
                                border: "1px solid black",
                            }}
                            onClick={handleAiButtonClick} // Call function to toggle AI state
                        >
                            <img
                                src="/ai-technology.png" // Path to the image in your assets folder
                                alt="AI Icon"
                                style={{
                                    width: "20px", // Adjust the width to your desired size
                                    height: "20px", // Adjust the height to your desired size
                                    objectFit: "contain", // Ensure the image maintains aspect ratio
                                }}
                            />
                            Ai
                        </Button>
                    </Box>
                </Grid>
                <Divider sx={{ mb: 0 }} />
                <RequestsList requests={regularRequests} />
            </Box>
        </Box>


    );
};

export default RequestPage;