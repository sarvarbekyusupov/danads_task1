import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Theme, Language } from '@/types'
import { STORAGE_KEYS, DEFAULT_THEME, DEFAULT_LANGUAGE } from '@/constants'

export const usePreferencesStore = defineStore(
  'preferences',
  () => {
    // State
    const theme = ref<Theme>(DEFAULT_THEME)
    const language = ref<Language>(DEFAULT_LANGUAGE)

    // Getters
    const isDark = computed(() => {
      if (theme.value === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      return theme.value === 'dark'
    })

    const effectiveTheme = computed(() => (isDark.value ? 'dark' : 'light'))

    // Actions
    function setTheme(newTheme: Theme) {
      theme.value = newTheme
    }

    function setLanguage(newLanguage: Language) {
      language.value = newLanguage
    }

    function toggleTheme() {
      if (theme.value === 'system') {
        theme.value = isDark.value ? 'light' : 'dark'
      } else {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
      }
    }

    function toggleLanguage() {
      language.value = language.value === 'en' ? 'uz' : 'en'
    }

    // Apply theme to document
    function applyTheme() {
      const html = document.documentElement
      if (effectiveTheme.value === 'dark') {
        html.setAttribute('data-theme', 'dark')
      } else {
        html.removeAttribute('data-theme')
      }
    }

    // Watch theme changes and apply to document
    watch(
      () => effectiveTheme.value,
      () => {
        applyTheme()
      },
      { immediate: true }
    )

    // Watch for system theme changes when theme is 'system'
    const setupSystemThemeListener = () => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        applyTheme()
      }
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }

    watch(
      () => theme.value,
      (newTheme) => {
        if (newTheme === 'system') {
          setupSystemThemeListener()
        }
      },
      { immediate: true }
    )

    return {
      theme,
      language,
      isDark,
      effectiveTheme,
      setTheme,
      setLanguage,
      toggleTheme,
      toggleLanguage,
    }
  },
  {
    $persist: {
      key: STORAGE_KEYS.PREFERENCES,
      include: ['theme', 'language'],
    },
  }
)
