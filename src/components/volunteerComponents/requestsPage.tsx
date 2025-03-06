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
import { regularRequests } from "./mock";
import { getAllCities, getAllRequests, getAllRequestTypes } from "./api";

const RequestPage = () => {

    const [requestTypes, setRequestTypes] = useState([]);
    const [request, setRequests] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchRequestTypes = async () => {
            const types = await getAllRequestTypes();
            setRequestTypes(types);
        };

        const fetchAllRequest = async () => {
            const reqs = await getAllRequests();
            // console.log(reqs)
            const sortedRequests = (reqs as []).sort((a, b) => {
                // Compare is_urgent values inside request object
                if (a.request.is_urgent === b.request.is_urgent) {
                    return 0; // If both have the same urgency, leave unchanged
                }
                return a.request.is_urgent ? -1 : 1; // Urgent first, non-urgent later
            });
            setRequests(sortedRequests);
        };

        const fetchAllCities = async () => {
            const cities = await getAllCities();
            setCities(cities);
        };

        fetchAllCities()
        fetchAllRequest()
        fetchRequestTypes();
    }, []);
    const [isAiClicked, setIsAiClicked] = useState(false); // Track if the AI button is clicked

    const handleAiButtonClick = () => {
        setIsAiClicked((prevState) => !prevState); // Toggle AI button state
        if (!isAiClicked) {
            // Reset fields when turning on the AI mode
            setCategory('');
            setArea('נתניה');
            setSelectedDate('');
        }
    };

    const [map, setMap] = useState<Map | null>(null);
    const [vectorSource, setVectorSource] = useState<VectorSource | null>(null);

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
            regularRequests.forEach((request) => addLocationToMap(request.city.city_name));
        }
    }, [map, regularRequests, vectorSource]);

    // Filter requests based on selected filters inside useEffect or inline when rendering
    const filteredRequests = request.filter((request) => {
        const isCategoryMatch = category ? request.request_type.type_name === category : true;
        const isAreaMatch = area ? request.city.city_name === area : true;

        return isCategoryMatch && isAreaMatch;
        // return true
    });

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
                                onChange={(event) => setCategory(event.target.value)} // Handle selection change
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
                                {requestTypes.map((type) => (
                                    <MenuItem key={type.type_name} value={type.type_name}>{type.type_name}</MenuItem>
                                ))}
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
                                {/* <MenuItem value=""><em>לא נבחר</em></MenuItem>
                                <MenuItem value="ראשון לציון">ראשון לציון</MenuItem>
                                <MenuItem value="תל אביב">תל אביב</MenuItem>
                                <MenuItem value="נס ציונה">נס ציונה</MenuItem> */}
                                <MenuItem value=""><em>לא נבחר</em></MenuItem>
                                {cities.map((city) => (
                                    <MenuItem key={city.city_name} value={city.city_name}>{city.city_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* תאריך */}
                    <Grid item xs={12} sm={4} md={3}>
                        {/* <FormControl fullWidth>
                            <TextField
                                id="date-picker"
                                type="date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                disabled={isAiClicked}
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
                        </FormControl> */}
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

                <Divider sx={{ borderBottomWidth: 2, marginY: 2 }} />


                <RequestsList requests={filteredRequests} />
            </Box>
        </Box>
    );
};

export default RequestPage;
