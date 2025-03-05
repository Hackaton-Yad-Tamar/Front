import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import RequestsList from "./requestsList";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

const RequestPage = () => {
    const [sosRequests, setSosRequests] = useState([
        { name: "אליס ג'ונסון", emergencyType: "התקף לב", location: "ניו יורק", severity: "קריטי", responseStatus: "ממתין" },
        { name: "בוב ויליאמס", emergencyType: "תאונת דרכים", location: "לוס אנג'לס", severity: "חמור", responseStatus: "בתהליך" },
    ]);

    const [regularRequests, setRegularRequests] = useState([
        { name: "צ'רלי בראון", emergencyType: "פציעה משריפה", location: "שיקגו", severity: "בינוני", responseStatus: "טופל" },
        { name: "דיויד מילר", emergencyType: "טביעה", location: "מיאמי", severity: "קריטי", responseStatus: "ממתין" },
        { name: "אמה וילסון", emergencyType: "שבר", location: "סן פרנסיסקו", severity: "קל", responseStatus: "בתהליך" },
    ]);

    useEffect(() => {
        const fetchCoordinates = async (address: string) => {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    console.log(`Coordinates for ${address}: Latitude ${lat}, Longitude ${lon}`);
                    initializeMap(lat, lon);
                } else {
                    console.error("Location not found.");
                }
            } catch (error) {
                console.error("Geocoding error:", error);
            }
        };

        const initializeMap = (lat: string, lon: string) => {
            new Map({
                target: "map",
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([parseFloat(lon), parseFloat(lat)]),
                    zoom: 10,
                }),
            });
        };

        const address = "Tel Aviv, Israel";
        fetchCoordinates(address);
    }, []);

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Box sx={{ width: "50%", height: "100%" }}>
                <div id="map" style={{ width: "100%", height: "100%" }}></div>
            </Box>

            <Box sx={{ width: "50%", height: "100%", padding: 2, overflowY: "auto" }}>
                <Box sx={{ fontSize: 40, color: "red", textAlign: "right", padding: 2 }}>
                    הבקשות שלי
                </Box>

                <Box sx={{ fontSize: 30, color: "red", textAlign: "right", padding: 2 }}>
                    SOS בקשות
                </Box>
                <RequestsList requests={sosRequests} />

                <Box sx={{ fontSize: 30, color: "red", textAlign: "right", padding: 2 }}>
                    בקשות לא דחופות
                </Box>
                <RequestsList requests={regularRequests} />
            </Box>
        </Box>
    );
};

export default RequestPage;
