import { ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/ComponentTemplate/navbar";
import "./i18n/config";
import { Namespace } from "./i18n/namespaces";
import mockUser from "./mockUser";
import theme from "./theme";
import Homepage from "./views/Homepage/Homepage"; // Import HomePage component
import ProfileView from "./views/ProfileView/ProfileView";

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

export default App;
