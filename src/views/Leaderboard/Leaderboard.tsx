import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { themeColors } from "../../App";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import eventImage from "../../assets/event.jpg";
import man1 from "../../assets/man1.jpg";
import man2 from "../../assets/man2.jpg";
import man3 from "../../assets/man3.jpg";
import man4 from "../../assets/man4.jpg";
import man5 from "../../assets/man5.jpg";
import man6 from "../../assets/man6.jpg";

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
        image: `${man1}`,
        volunteer_name: "ישראל ישראלי",
        value: 35
    },
    {
        achievement_name: "המתנדב רחב ההשפעה",
        image: `${man2}`,
        volunteer_name: "שמעון פרץ",
        value: 40
    },
    {
        achievement_name: "המתנדב המהיר",
        image: `${man3}`,
        volunteer_name: "דוד לוי",
        value: 15
    },
    {
        achievement_name: "המתנדב מרחיק הלכת",
        image: `${man4}`,
        volunteer_name: "רון כהן",
        value: 300
    },
    {
        achievement_name: "המתנדב הרב-תחומי",
        image: `${man5}`,
        volunteer_name: "מאיה רוזן",
        value: 5
    },
    {
        achievement_name: "המתנדב המקצועי",
        image: `${man6}`,
        volunteer_name: "יעל אבקסיס",
        value: 4.8
    }
    ];

const lead_volunteers = () => {
    
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

    return (<Box 
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
        <Box fontWeight="bold" textAlign="center">
            <Typography fontSize="2rem">{achievement.achievement_name}</Typography></Box>
        <Box fontSize="0.9rem" color="gray.600">
            <Typography> {achievement.volunteer_name} </Typography> </Box>
        <Box fontSize="1.5rem" fontWeight="bold" bgcolor="primary.main" color="white" px={3} py={1} borderRadius={4} textAlign="center">
            <Typography>{achievement.value} {categoryDescriptions[achievement.achievement_name] || ""}</Typography>
        </Box>
        </Box>
        ))}
        </Box>);

}

const StoryCarousel = () => {
    const stories = [
        "כל כך מתרגשת, הבת שלי קיבלה היום משלוח מיוחד שמיועד לחלוקה לכל ילדות הגן, כל ילדיהן יצא להם לעזור ולהרגיש את תחושת הנתינה, ואני לא יכולה לתאר את החיוך שהיה לה על הפנים ברגע שקיבלה את המשלוח, חיוך כזה לא ראיתי מזה שנה, והתרגשות שכזו קשה להסביר במילים, אני יודעת שהמעשה הזה עשה הבדל אמיתי בחיים של הילדים בגן, וזה פשוט מלא אותי בגאווה ובאושר",
        
        "כל פעם שאני מרגישה לבד או כשאני נתקלת בתחושות קשות ובלתי נסבלות, אני לא מהססת ומתקשרת למתנדבת המדהימה שלי, אני גרה לבד, יש לי ימים שלא קל לי בהם להתמודד עם כל המשימות והחיים היומיומיים, וכשאני מרגישה שהעולם סובב עליי, היא תמיד שם בשבילי, היא גרה גם היא לבד, אבל אני מרגישה שאנחנו לא לבד, אנחנו ביחד, היכולת שלה להקשיב, לייעץ ולעודד, פשוט שינתה את החיים שלי, ואני כל כך מודה על הזכות להכיר אותה ולשתף אותה ברגעים כאלה",
      
        "בזכות יד תמר, אני הצלחתי לקבל זכויות וקיצבאות שלא ידעתי בכלל שמגיעות לי, כשהייתי על סף קריסה כלכלית, לא ידעתי לאן לפנות ומה לעשות כדי להיחלץ מהמצב הקשה, יד תמר שימשה עבורי כעוגן ומצפן בזמן שאני הייתי אובדת, והם לקחו את הזמן להבין את כל זכויותיי והגישו לי את כל המסמכים הנדרשים, זה בדיוק מה שהציל אותי והחזיר אותי למסלול, וזה לא משהו שאוכל לשכוח לעולם",
      
        "בהתחלה, כשאובחנתי כחולה, לא קיבלתי שום עזרה, זה היה כל כך מבלבל ומפחיד, וחשבתי שאין לי את הכלים להתמודד עם זה, כשהייתה לי התפרצות מחודשת של המחלה, החלטתי לפנות ליד תמר, הפעם, אני לא לבד, הם עזרו לי לממש את כל מה שמגיע לי, הכוונו אותי בתהליך והסבירו לי על הזכויות שלי בצורה שלא יכולתי לדמיין, הם עשו את כל ההבדל, וסוף סוף הרגשתי שיש לי את כל התמיכה שאני צריכה כדי להחלים ולהמשיך הלאה"
      ];

      const family_names = [
        "ברנשטיין",
        "לוי",
        "רוזן",
        "כהן"
      ];
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextStory = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    };
  
    const prevStory = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    };
  
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={4}>
        <IconButton onClick={prevStory} aria-label="Previous">
          <ArrowForward /> {/* Swap this with ArrowBack */}
        </IconButton>
  
        <Box sx={{ maxWidth: 500, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            משפחת {family_names[currentIndex]}
          </Typography>
          <Typography variant="body1" fontSize="1.3rem">
            {stories[currentIndex]}
          </Typography>
        </Box>
  
        <IconButton onClick={nextStory} aria-label="Next">
          <ArrowBack /> {/* Swap this with ArrowForward */}
        </IconButton>
      </Box>
    );
  };
  
  
const Leaderboard = () => {

    return (
        <Container sx={{ flexGrow: 1, my: 6, direction: "rtl" }}>
            <Typography variant="h1" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: themeColors.lightBlue }}>
                מצטייני החודש
            </Typography>
            {lead_volunteers()}
            
            <Typography variant="h1" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: themeColors.lightBlue, paddingTop: "5rem" }}>
                סיפורי קהילה
            </Typography>
            {StoryCarousel()}


            <Box >
`               <Typography variant="h1" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: themeColors.lightBlue, paddingTop: "5rem" }}>
                    האירועים המובילים שלנו
                </Typography>
                <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom sx={{ color: themeColors.lightBlue }}>
                    האור שבחושך - ערב התרמה למען משפחות שכולות 
                </Typography>
                <Typography variant="body1" textAlign="center" gutterBottom  fontSize={25} lineHeight={2}>
                    ביישוב קטן בגליל, שבו הקהילה הייתה כמו משפחה אחת גדולה, התאספו התושבים לערב מיוחד במינו - ערב התרמה למען משפחות שכולות שאיבדו את יקיריהן במערכות ישראל.

                    היוזמה יצאה מקבוצת תלמידי תיכון מקומי, שרצו לעשות מעשה משמעותי לזכר אחד מבני היישוב שנפל בקרב. הם פנו לראש המועצה והציעו להפיק אירוע שכל הכנסותיו יוקדשו לקרן סיוע למשפחות השכולות. תוך ימים ספורים, כל היישוב התגייס - בעלי עסקים תרמו פרסים להגרלה, מסעדות מקומיות סיפקו אוכל בהתנדבות, ולהקת הנוער של המתנ"ס החלה בחזרות למופע מרגש.

                    בערב האירוע, האולם היה מלא עד אפס מקום. על הבמה הוקרנו סרטונים על הנופלים, וקרובי משפחה שיתפו סיפורים אישיים. אחד הרגעים המרגשים היה כשאמו של חייל שנפל סיפרה כיצד התמיכה הקהילתית עזרה לה לקום מחדש.

                    לאחר מופע מרגש של להקת הנוער, התקיימה מכירה פומבית שבה נמכרו יצירות של אמנים מקומיים, וחלק מהפריטים הוענקו כמתנה למשפחות השכולות. עד סוף הערב, הצליחו לגייס סכום מרשים, הרבה מעבר לציפיות.

                    אך מעבר לכסף שנאסף, האירוע הותיר רושם עמוק על כל המשתתפים. הוא הוכיח את כוחה של קהילה, את הערבות ההדדית ואת היכולת להפוך כאב לאור של נתינה ואהבה.
                </Typography>
                <Box>
                    <img src={eventImage} alt="event" style={{ width: "100%" }} />
                </Box>
            


            </Box>

        </Container>
        
    );
    };

    export default Leaderboard;