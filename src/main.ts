import '@/assets/main.scss'

import { createApp } from 'vue'
import App from '@/App.vue'
import pinia from '@/plugins/pinia'
import router from '@/plugins/router'
import i18n from '@/plugins/i18n'
import '@/plugins/validation'
import { usePreferencesStore } from '@/stores'
import { setI18nLocale } from '@/plugins/i18n'

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(i18n)

// Initialize preferences store before mounting
const preferencesStore = usePreferencesStore()

// Sync i18n locale with store
setI18nLocale(preferencesStore.language)

app.mount('#app')
