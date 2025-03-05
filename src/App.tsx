import { useTranslation } from "react-i18next";
import "./i18n/config";
import { Namespace } from "./i18n/namespaces";

const App = () => {
  const { t: tProfileView } = useTranslation(Namespace.profileView);
  return <div>{tProfileView("example")}</div>;
};

export default App;
