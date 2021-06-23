import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enResources from "./i18n.en";
import esResources from "./i18n.es";
import ptResources from "./i18n.pt";


// the translations
const resources = {
  en: {
    translation: enResources
  },
  es: {
    translation: esResources
  },
  pt: {
    translation: ptResources
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;