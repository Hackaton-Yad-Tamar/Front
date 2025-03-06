import React, { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import { RequestDialogProps } from "../../types/request.types";

const RequestDialog: React.FC<RequestDialogProps> = ({ open, onClose, emergency: request }) => {
  if (!request) return null;
  const [submit, setSubmit] = React.useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const vectorSource = useRef<VectorSource | null>(null);
  const [featuresLoaded, setFeaturesLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted when the component mounts
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Initialize or update the map
  useEffect(() => {


    if (!open || !mapRef.current || !isMounted) {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
      return;
    }

    const israelCenter = fromLonLat([34.8516, 31.0461]); // Center on Israel
    const newVectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: newVectorSource,
    });

    let newMap: Map;
    if (mapInstance.current) {
      newMap = mapInstance.current;
      newMap.setTarget(mapRef.current);
      newMap.getView().setCenter(israelCenter);
      newMap.getView().setZoom(7);
      vectorSource.current = newVectorSource;
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

    newMap.updateSize();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(null);
        mapInstance.current = null;
      }
    };
  }, [open, isMounted]);

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

  const onSubmit = () => {
    console.log("gal")
    setSubmit(!submit)
  }

  // Add location to map
  useEffect(() => {
    if (mapInstance.current && vectorSource.current && request && open && !featuresLoaded && isMounted) {
      addLocationToMap(request.location).then(() => {
        setFeaturesLoaded(true);
        if (mapInstance.current) {
          mapInstance.current.updateSize();
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
      maxWidth="sm" // Keep the dialog smaller and thinner
      disablePortal={false}
      sx={{
        minHeight: 400, // Maintain smaller height
        fontFamily: "Rubik, sans-serif",
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          direction: "rtl",
          backgroundColor: "#e1f5fe",
          fontFamily: "Rubik, sans-serif",
          padding: "10px 20px",
        }}
      >
        <Typography variant="h5" sx={{ color: "#00AEEE", fontFamily: "Rubik, sans-serif" }}>
          {request.is_urgent ? "SOS חירום" : "עזרה לא דחופה"}
        </Typography>
        <img
          src="https://yadtamar.org.il/wp-content/uploads/2020/05/menu-logo-small.png" // Use the logo from the image or replace with your URL
          alt="Emergency Icon"
          style={{ width: 40, height: 40 }}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          fontFamily: "Rubik, sans-serif",
          direction: "rtl",
          textAlign: "right",
          padding: "10px 20px",
          backgroundColor: "#e1f5fe",
          maxHeight: "300px",
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
          {/* Details on the left (50% width) */}
          <Box sx={{ flex: 1, paddingRight: "10px", fontFamily: "Rubik, sans-serif" }}>
            <Typography sx={{ color: "#324A6D", fontFamily: "Rubik, sans-serif" }}><strong>שם:</strong> {request.first_name} {request.last_name}</Typography>
            <Typography sx={{ color: "#324A6D", fontFamily: "Rubik, sans-serif" }}><strong>אזור:</strong> {request.city}  </Typography>
            <Typography sx={{ color: "#324A6D", fontFamily: "Rubik, sans-serif" }}><strong>תיאור:</strong> {request.description}</Typography>
            <Typography sx={{ color: "#324A6D", fontFamily: "Rubik, sans-serif" }}>
              <strong>מספר טלפון:</strong> {request.phone_number}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, height: "300px", pl: 1 }}>
            <div
              ref={mapRef}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                borderColor: "white",
                boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "flex-end",
          backgroundColor: "#e1f5fe",
          padding: "10px 20px",
        }}
      >
        {submit && <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#00AEEE",
            borderRadius: "20px",
            border: "1px solid #00AEEE",
            "&:hover": {
              backgroundColor: "#e1f5fe",
            },
          }}
        >
          ביטול התנדבות
        </Button>}
        <Button
          onClick={onSubmit}
          disabled={submit}
          color="white"
          sx={{
            backgroundColor: submit ? "#28A745" : "#00AEEE", // Green when submitted, default otherwise
            color: "white",
            borderRadius: "20px",
            marginRight: "6px",
            "&:hover": {
              backgroundColor: submit ? "#218838" : "#007BBD", // Darker green on hover if submitted
            },
          }}
        >
          {submit ? "✔" : "אישור"}
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;