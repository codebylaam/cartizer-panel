import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import bengali from "@/translation/bn"
import english from "@/translation/en.ts"

const resources = {
  en: {
    translation: english,
  },
  bn: {
    translation: bengali,
  },
}

export const i18nCookieName = "i18nextLng"

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["cookie"],
      lookupCookie: i18nCookieName,
      caches: ["cookie"],
      cookieMinutes: 60 * 24 * 365, // 1 year
    },
  })

export const setSSRLanguage = createIsomorphicFn().server(async () => {
  const cookie = getCookie(i18nCookieName)
  await i18next.changeLanguage(cookie || "en")
})

export default i18next
