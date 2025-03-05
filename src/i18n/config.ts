import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Namespace } from "./namespaces";

import profileViewEn from "./locales/en/profileView.json";

const resources = {
  en: {
    [Namespace.profileView]: profileViewEn,
  },
} as const;

const namespaces = [Namespace.profileView] as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: namespaces,
  resources,
});

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["en"];
  }
}

export default i18n;
