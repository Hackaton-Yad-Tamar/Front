    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { Box, Container, Typography } from "@mui/material";
import { themeColors } from "../../App";

    const categoryDescriptions = {
    "המתנדב החרוץ": "שעות התנדבות",
    "המתנדב רחב ההשפעה": "משפחות שנעזרו במתנדב",
    "המתנדב המהיר": "דקות לתגובה",
    "המתנדב מרחיק הלכת": "ק\"מ במסע לעזור",
    "המתנדב הרב-תחומי": "תחומי התנדבות שונים",
    "המתנדב המקצועי": " דירוג ממוצע"
    };

    const fakeData = [
    {
        achievement_name: "המתנדב החרוץ",
        image: "https://via.placeholder.com/100",
        volunteer_name: "ישראל ישראלי",
        value: 35
    },
    {
        achievement_name: "המתנדב רחב ההשפעה",
        image: "https://via.placeholder.com/100",
        volunteer_name: "שמעון",
        value: 40
    },
    {
        achievement_name: "המתנדב המהיר",
        image: "https://via.placeholder.com/100",
        volunteer_name: "דוד לוי",
        value: 15
    },
    {
        achievement_name: "המתנדב מרחיק הלכת",
        image: "https://via.placeholder.com/100",
        volunteer_name: "רון כהן",
        value: 300
    },
    {
        achievement_name: "המתנדב הרב-תחומי",
        image: "https://via.placeholder.com/100",
        volunteer_name: "מאיה רוזן",
        value: 5
    },
    {
        achievement_name: "המתנדב המקצועי",
        image: "https://via.placeholder.com/100",
        volunteer_name: "יעל אבקסיס",
        value: 4.8
    }
    ];

    const Leaderboard = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAchievements = async () => {
        try {
            // Replace with actual API call when backend is ready
            // const response = await axios.get("/api/volunteers/achievements");
            setAchievements(fakeData);
        } catch (err) {
            setError("Failed to fetch achievements.");
        } finally {
            setLoading(false);
        }
        };

        fetchAchievements();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container sx={{ flexGrow: 1, my: 6, direction: "rtl" }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: themeColors.lightBlue }}>
                מצטייני החודש
            </Typography>
            <Box 
            p={6} 
            bgcolor="gray.100" 
            borderRadius={2} 
            display="grid" 
            gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr 1fr" }} // Add this to create 3 columns on medium screens
            gap={6} 
            maxWidth="lg" 
            mx="auto"
            >

        {achievements.map((achievement, index) => (
            <Box 
            key={index} 
            p={4} 
            bgcolor="white" 
            color="gray.800" 
            borderRadius={2} 
            boxShadow={2} 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            gap={2} 
            border={1} 
            borderColor="gray.300"
            >
            <img 
                src={achievement.image} 
                alt={achievement.achievement_name} 
                style={{ width: "64px", height: "64px", borderRadius: "50%", border: "2px solid #ccc" }}
            />
            <Box fontWeight="bold" fontSize="1.2rem" textAlign="center">{achievement.achievement_name}</Box>
            <Box fontSize="0.9rem" color="gray.600">{achievement.volunteer_name}</Box>
            <Box fontSize="1.5rem" fontWeight="bold" bgcolor="primary.main" color="white" px={3} py={1} borderRadius={4} textAlign="center">
                {achievement.value} {categoryDescriptions[achievement.achievement_name] || ""}
            </Box>
            </Box>
            ))}
            </Box>
        </Container>
        
    );
    };

    export default Leaderboard;