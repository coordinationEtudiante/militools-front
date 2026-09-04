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
import { definePreset } from '@primeuix/themes'

const MyPreset = definePreset(Aura, {
  semantic : {
    primary : {
      50: '#f3e8ff', 100: '#e0ccf4', 200: '#c499e8',
      300: '#a866dc', 400: '#8a2b9e', 500: '#5d0d6e',
      600: '#4a0a58', 700: '#380842', 800: '#25052c',
      900: '#130316', 950: '#09010b',
    },
    surface: {
      0: '#121014',           // dark surface (fond principal)
      50: '#1c1a21',          // dark surface-alt
      100: '#2a2730',
      // ...échelle jusqu'au white pour le light
      950: '#ffffff',
    },
    colorScheme: {
      light: {
        surface: { color: '#ffffff' },
        text: { color: '#1a1a1a', mutedColor: '#6b7280' },
        primary: { color: '#5d0d6e', contrastColor: '#ffffff' },
      },
      dark: {
        surface: { color: '#121014' },
        text: { color: '#f3f4f6', mutedColor: '#9ca3af' },
        primary: { color: '#8a2b9e', contrastColor: '#ffffff' },
      }
    },
    formField: {
      border: { color: '{surface.border}' },
    },
    highlight: {
      background: '{surface.100}',
      color: '{surface.950}',
    },
    content: {
      background: '{surface.50}',
    }
  },

})

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
    preset: MyPreset,
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
