import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import uz from '@/locales/uz.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    uz
  }
})

export function setI18nLocale(locale: 'en' | 'uz') {
  i18n.global.locale.value = locale
}

export default i18n
