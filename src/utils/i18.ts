import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import bn from "@/translation/bn"
import en from "@/translation/en"

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      bn: {
        translation: bn,
      },
    },
    lng: "bn",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
