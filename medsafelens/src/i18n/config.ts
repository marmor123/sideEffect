import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en.json'
import heTranslation from './he.json'

export const initI18n = async () => {
  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslation
      },
      he: {
        translation: heTranslation
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  })
}

export default i18n
