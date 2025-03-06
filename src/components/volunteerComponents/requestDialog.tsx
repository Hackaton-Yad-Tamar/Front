import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RequestDialogProps } from "../../types/request.types";
import { Box } from "@mui/material";
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

const RequestDialog: React.FC<RequestDialogProps> = ({ open, onClose, emergency: request }) => {
  if (!request) return null;

  const title = request.emergencyType === "sos" ? "בקשת SOS" : "בקשה רגילה";
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const vectorSource = useRef<VectorSource | null>(null);
  const [featuresLoaded, setFeaturesLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if the component has mounted

  // Set isMounted when the component mounts
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // Clean up on unmount
  }, []);

  // Initialize or update the map only when the dialog opens and the component is mounted
  useEffect(() => {


    if (!open || !mapRef.current || !isMounted) {
      // Clean up if the dialog is closing or component isn’t mounted
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
      return; // Do nothing if the dialog is closed, ref isn’t ready, or component isn’t mounted
    }

    // Initialize or update the map when the dialog opens
    const israelCenter = fromLonLat([34.8516, 31.0461]); // Center on Israel
    const newVectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: newVectorSource,
    });

    let newMap: Map;
    if (mapInstance.current) {
      newMap = mapInstance.current;
      newMap.setTarget(mapRef.current); // Reattach to the DOM
      newMap.getView().setCenter(israelCenter); // Reset center
      newMap.getView().setZoom(7); // Reset zoom
      vectorSource.current = newVectorSource; // Update vector source
      newMap.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) {
          layer.setSource(newVectorSource);
        }
      });
    } else {
      newMap = new Map({
        target: mapRef.current,
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
      mapInstance.current = newMap;
      vectorSource.current = newVectorSource;
    }

    // Ensure the map updates its size when the dialog is visible
    newMap.updateSize();

    // Clean up when the dialog closes or component unmounts
    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null); // Clean up the map
        mapInstance.current = null;
      }
    };
  }, [open, isMounted]); // Re-run when `open` or `isMounted` changes

  const createFeature = (lon: number, lat: number, properties: Record<string, any> = {}) => {
    if (!vectorSource.current) return null;

    const point = new Point(fromLonLat([lon, lat]));
    const feature = new Feature({
      geometry: point,
      ...properties,
    });

    vectorSource.current.addFeature(feature);
    return feature;
  };

  const addLocationToMap = async (location: string) => {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        createFeature(parseFloat(lon), parseFloat(lat), { name: location });
        return [lat, lon] as [string, string];
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
    return null;
  };

  // Add location to map only when the dialog is open, map is ready, and features aren’t loaded
  useEffect(() => {
    if (mapInstance.current && vectorSource.current && request && open && !featuresLoaded && isMounted) {
      addLocationToMap(request.location).then(() => {
        setFeaturesLoaded(true); // Mark features as loaded to prevent re-adding
        if (mapInstance.current) {
          mapInstance.current.updateSize(); // Ensure map updates after adding features
        }
      });
    }
  }, [mapInstance, vectorSource, request, open, featuresLoaded, isMounted]);

  return (
    <Dialog
      keepMounted
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      disablePortal={false} // Ensure rendering in the DOM immediately
      sx={{
        minHeight: 500,
        fontFamily: "Rubik, sans-serif",
      }}
    >
      <DialogTitle sx={{
        display: "flex",
        alignItems: "center",
        direction: "rtl",
        backgroundColor: "#e1f5fe",
        fontFamily: "Rubik, sans-serif",
      }}>
        <img
          src="https://yadtamar.org.il/wp-content/uploads/2020/05/menu-logo-small.png"
          alt="Emergency Icon"
          style={{ width: 40, height: 40, alignItems: "end" }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          fontFamily: "Rubik, sans-serif",
          direction: "rtl",
          textAlign: "right",
          padding: "10px 20px",
          backgroundColor: "#e1f5fe",
          maxHeight: "400px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#00AEEE",
            borderRadius: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e1f5fe",
          },
        }}
      >
        <Box sx={{ display: "flex", height: "100%" }}>
          {/* OpenLayers Map on the left (50% width) */}
          <Box sx={{ flex: 1, height: "400px" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          </Box>

          {/* Current content on the right (50% width) */}
          <Box sx={{ flex: 1, paddingLeft: "20px" }}>
            <Typography sx={{ fontFamily: "Rubik, sans-serif", direction: "rtl", textAlign: "right", color: "#00AEEE" }} variant="h6">{title}</Typography>
            <Box sx={{ paddingRight: "20px", fontFamily: "Rubik, sans-serif" }}>
              <Box mb={2}>
                <Typography sx={{ color: "#324A6D", fontFamily: "Rubik, sans-serif" }}><strong>שם:</strong></Typography>
                <Typography>{request.name}</Typography>
              </Box>
              <Box mb={2}>
                <Typography sx={{ color: "#324A6D" }}><strong>אזור:</strong></Typography>
                <Typography>{request.location}</Typography>
              </Box>
              <Box mb={2}>
                <Typography sx={{ color: "#324A6D" }}><strong>תיאור:</strong></Typography>
                <Typography>{request.description}</Typography>
              </Box>
              <Box mb={2}>
                <Typography sx={{ color: "#324A6D" }}><strong>סוג חירום:</strong></Typography>
                <Typography>{request.emergencyType}</Typography>
              </Box>
              <Box mb={2}>
                <Typography sx={{ color: "#324A6D" }}><strong>חומרה:</strong></Typography>
                <Typography>{request.severity}</Typography>
              </Box>
              <Box mb={2}>
                <Typography sx={{ color: "#324A6D" }}><strong>סטטוס תגובה:</strong></Typography>
                <Typography>{request.responseStatus}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{
        justifyContent: "flex-start",
        backgroundColor: "#e1f5fe",
      }}>
        <Button onClick={onClose} color="primary" sx={{ backgroundColor: "#00AEEE", color: "white", borderRadius: "20px" }}>
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;