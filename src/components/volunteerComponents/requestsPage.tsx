import { Box } from "@mui/material";
import { useState } from "react";
import RequestsList from "./requestsList";

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
            }}>SOS בקשות</Box>

            <Box sx={{
                width: "95%",
                padding: "0 20px 0 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <RequestsList requests={sosRequests} />
            </Box>


            <Box sx={{
                fontSize: 30,
                color: "red",
                display: "flex",
                justifyContent: "flex-end",
                padding: 2
            }}>  בקשות לא דחופות</Box>
            <Box sx={{
                width: "95%",
                padding: "0 20px 0 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <RequestsList requests={regularRequests} />
            </Box>
        </div>
    );
};

export default RequestPage;
