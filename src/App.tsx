import { Box } from "@mui/material";
import RequestsList from "./components/volunteerComponents/requestsList";
import { useState } from "react";

const App = () => {
    const [sosRequests, setSosRequests] = useState([
        { name: "אליס ג'ונסון", emergencyType: "התקף לב", location: "ניו יורק", severity: "קריטי", responseStatus: "ממתין" },
        { name: "בוב ויליאמס", emergencyType: "תאונת דרכים", location: "לוס אנג'לס", severity: "חמור", responseStatus: "בתהליך" },
    ]);

    const [regularRequests, setRegularRequests] = useState([
        { name: "צ'רלי בראון", emergencyType: "פציעה משריפה", location: "שיקגו", severity: "בינוני", responseStatus: "טופל" },
        { name: "דיויד מילר", emergencyType: "טביעה", location: "מיאמי", severity: "קריטי", responseStatus: "ממתין" },
        { name: "אמה וילסון", emergencyType: "שבר", location: "סן פרנסיסקו", severity: "קל", responseStatus: "בתהליך" },
    ]);

    return (
        <div>
            <Box sx={{
                fontSize: 40,
                color: "red",
                display: "flex",
                justifyContent: "flex-end",
                padding: 2
            }}>הבקשות שלי</Box>

            <Box sx={{
                fontSize: 30,
                color: "red",
                display: "flex",
                justifyContent: "flex-end",
                padding: 2
            }}> SOS בקשות</Box>
            <RequestsList requests={sosRequests} />

            <Box sx={{
                fontSize: 30,
                color: "red",
                display: "flex",
                justifyContent: "flex-end",
                padding: 2
            }}>  בקשות לא דחופות</Box>
            <RequestsList requests={regularRequests} />
        </div>
    );
};

export default App;
