import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import RequestsList from "./requestsList";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import "ol/ol.css";

const RequestPage = () => {
    const [sosRequests, setSosRequests] = useState([
        { name: "אליס ג'ונסון", emergencyType: "התקף לב", location: "תל אביב", severity: "קריטי", responseStatus: "ממתין" },
        { name: "בוב ויליאמס", emergencyType: "תאונת דרכים", location: "חיפה", severity: "חמור", responseStatus: "בתהליך" },
    ]);

    const [regularRequests, setRegularRequests] = useState([
        { name: "צ'רלי בראון", emergencyType: "פציעה משריפה", location: "בת ים", severity: "בינוני", responseStatus: "טופל" },
        { name: "דיויד מילר", emergencyType: "טביעה", location: "ראשון לציון", severity: "קריטי", responseStatus: "ממתין" },
        { name: "אמה וילסון", emergencyType: "שבר", location: "נס ציונה", severity: "קל", responseStatus: "בתהליך" },
    ]);

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

    useEffect(() => {
        if (map && vectorSource) {
            // Dynamically add locations from sosRequests and regularRequests
            sosRequests.forEach((request) => {
                console.log(request.location);
                
                return addLocationToMap(request.location)
            });
            regularRequests.forEach((request) => addLocationToMap(request.location));
        }
    }, [map, sosRequests, regularRequests, vectorSource]);

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
