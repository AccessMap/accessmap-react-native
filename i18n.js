import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enResources from "./i18n.en";
import esResources from "./i18n.es";
import ptResources from "./i18n.pt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: {
    translation: enResources,
  },
  es: {
    translation: esResources,
  },
  pt: {
    translation: ptResources,
  },
};

const LOCALE_PERSISTENCE_KEY = "language";

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (language) => {
    const persistedLocale = await AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY);
    if (!persistedLocale) {
      return language("en");
    }
    language(persistedLocale);
  },
  init: () => {},
  cacheUserLanguage: (locale) => {
    AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
  },
};

i18n
  .use(languageDetector)  
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
