import { ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import DutiesCalendar from "./components/CalendarComponent";
import "./i18n/config";
import { Namespace } from "./i18n/namespaces";
import mockUser from "./mockUser";
import theme from "./theme";
import ProfileView from "./views/ProfileView/ProfileView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/ComponentTemplate/navbar";
import Homepage from "./views/Homepage/Homepage"; // Import HomePage component
import DutiesCalendar from './components/CalendarComponent';

const App = () => {
  const { t: tProfileView } = useTranslation(Namespace.profileView);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<ProfileView user={mockUser} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;