import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import { Tooltip } from 'primevue'
import PrimeVue from 'primevue/config'
import Mask from 'primevue/mask'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import enMessages from '../locales/en.json'
import frMessages from '../locales/fr.json'
import App from './App.vue'
import './index.css'
import { router } from './router'

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

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  license: import.meta.env.VITE_PRIMEUI_LICENSE_KEY,
})

app.directive('mask', Mask)
app.directive('tooltip', Tooltip)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ToastService)

app.mount('#app')
