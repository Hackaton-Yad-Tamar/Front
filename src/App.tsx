import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./i18n/config";
import { Namespace } from "./i18n/namespaces";
import mockUser from "./mockUser";
import ProfileView from "./views/ProfileView/ProfileView";
import Navbar from "./components/ComponentTemplate/navbar";
import Homepage from "./views/Homepage/Homepage"; // Import HomePage component
import DutiesCalendar from './components/CalendarComponent';

const App = () => {
  const { t: tProfileView } = useTranslation(Namespace.profileView);
  return (
    <Router>
      
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

      </div>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<ProfileView user={mockUser} />} />
        </Routes>
    </Router>
  );
};

export default App;