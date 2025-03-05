import { useTranslation } from "react-i18next";
import "./i18n/config";
import { Namespace } from "./i18n/namespaces";
import mockUser from "./mockUser";
import ProfileView from "./views/ProfileView/ProfileView";

const App = () => {
  const { t: tProfileView } = useTranslation(Namespace.profileView);
  return <ProfileView user={mockUser} />;
};

export default App;
