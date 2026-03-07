import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePreferencesStore } from '@/stores'
import { setI18nLocale } from '@/plugins/i18n'

export function usePreferences() {
  const store = usePreferencesStore()
  const { locale } = useI18n()

  // Sync i18n locale with store language
  const syncLocale = () => {
    if (locale.value !== store.language) {
      setI18nLocale(store.language)
    }
  }

  return {
    // State (computed from store)
    theme: computed(() => store.theme),
    language: computed(() => store.language),
    isDark: computed(() => store.isDark),
    effectiveTheme: computed(() => store.effectiveTheme),

    // Actions
    setTheme: store.setTheme,
    setLanguage: store.setLanguage,
    toggleTheme: store.toggleTheme,
    toggleLanguage: () => {
      store.toggleLanguage()
      syncLocale()
    },
  }
}
