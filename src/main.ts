import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import enMessages from '../locales/en.json'
import frMessages from '../locales/fr.json'
import App from './App.vue'
import './index.css'
import { router } from './router'
import { initPalette } from './theme/palettes'
import './theme/useTheme'
import ui from '@nuxt/ui/vue-plugin'

const browserLanguage = navigator.language.split('-')[0]
const supportedLanguages = ['fr', 'en']

const defaultLanguage = supportedLanguages.includes(browserLanguage ?? 'none')
  ? browserLanguage
  : 'fr'

const i18n = createI18n({
  legacy: false,
  locale: defaultLanguage,
  fallbackLocale: 'fr',
  messages: {
    fr: frMessages,
    en: enMessages,
  },
})

const app = createApp(App)

initPalette()

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ui)

app.mount('#app')
