import { computed, ref } from 'vue'
import { definePreset, usePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export interface Palette {
  label: string
  primary: Record<string, string>
  light: Record<string, string>
  dark: Record<string, string>
  accents?: Partial<Record<'success' | 'danger' | 'warn', Record<string, string>>>
}

export const palettes: Record<string, Palette> = {
  aura: {
    label: 'Aura (défaut)',
    primary: {},
    light: {},
    dark: {},
  },
  dracula: {
    label: 'Dracula',
    primary: {
      '50': '#f7f3fe',
      '100': '#ecdffd',
      '200': '#dfc8fb',
      '300': '#caa2f9',
      '400': '#bd93f9',
      '500': '#a970ef',
      '600': '#944fe0',
      '700': '#7d3bc6',
      '800': '#6530a1',
      '900': '#532c82',
      '950': '#341a54',
    },
    light: {
      '0': '#ffffff',
      '50': '#f8f8f8',
      '100': '#f0f0f1',
      '200': '#e4e4e6',
      '300': '#d4d4d8',
      '400': '#a3a3ad',
      '500': '#737480',
      '600': '#52525e',
      '700': '#3f4150',
      '800': '#2d2f3d',
      '900': '#21222c',
      '950': '#16171f',
    },
    dark: {
      '0': '#f8f8f2',
      '50': '#f1f2f5',
      '100': '#e5e6ed',
      '200': '#c9cbd8',
      '300': '#a9abc0',
      '400': '#8a8ea8',
      '500': '#6272a4',
      '600': '#5a6080',
      '700': '#44475a',
      '800': '#343746',
      '900': '#282a36',
      '950': '#1e1f29',
    },
  },
  nord: {
    label: 'Nord',
    primary: {
      '50': '#eef7fa',
      '100': '#d9eef4',
      '200': '#b3e0ea',
      '300': '#9fd4de',
      '400': '#88c0d0',
      '500': '#6da8bb',
      '600': '#5e81ac',
      '700': '#4c6a8f',
      '800': '#405875',
      '900': '#33465e',
      '950': '#1f2c3d',
    },
    light: {
      '0': '#ffffff',
      '50': '#fafcfe',
      '100': '#eef2f7',
      '200': '#e3e9f1',
      '300': '#d0d9e6',
      '400': '#b0bccf',
      '500': '#8c98ad',
      '600': '#5c6a82',
      '700': '#3f4a5f',
      '800': '#31394c',
      '900': '#262e40',
      '950': '#161c2b',
    },
    dark: {
      '0': '#eceff4',
      '50': '#e8edf4',
      '100': '#d8dee9',
      '200': '#c3ccda',
      '300': '#aab4c7',
      '400': '#7f8ba0',
      '500': '#4c566a',
      '600': '#434c5e',
      '700': '#3b4252',
      '800': '#333a49',
      '900': '#2e3440',
      '950': '#232936',
    },
  },
  coordo: {
    label: 'Coordo',
    primary: {
      '50': '#e7e1ee',
      '100': '#cfc3dd',
      '200': '#b39fc9',
      '300': '#997fb6',
      '400': '#7a59a1',
      '500': '#552a86',
      '600': '#4b2576',
      '700': '#402065',
      '800': '#331950',
      '900': '#26133c',
      '950': '#180c26',
    },
    light: {
      '0': '#ffffff',
      '50': '#fcfbf9',
      '100': '#f8f5f1',
      '200': '#e7e4e0',
      '300': '#d5d3cf',
      '400': '#c1bfbc',
      '500': '#a9a7a4',
      '600': '#908e8c',
      '700': '#757371',
      '800': '#575654',
      '900': '#373635',
      '950': '#191918',
    },
    dark: {
      '0': '#f6f3f8',
      '50': '#ebe6f0',
      '100': '#e0d8e7',
      '200': '#cbbdd6',
      '300': '#b5a2c5',
      '400': '#937ea7',
      '500': '#725b88',
      '600': '#50376a',
      '700': '#442c59',
      '800': '#372247',
      '900': '#2b1736',
      '950': '#24132e',
    },
    accents: {
      success: {
        '50': '#e1f1ea',
        '100': '#c4e3d5',
        '200': '#a0d2bb',
        '300': '#80c3a4',
        '400': '#5ab189',
        '500': '#2c9b68',
        '600': '#27885c',
        '700': '#21744e',
        '800': '#1a5d3e',
        '900': '#14462f',
        '950': '#0c2b1d',
      },
      danger: {
        '50': '#fbe3e8',
        '100': '#f6c6d2',
        '200': '#f1a4b7',
        '300': '#ec859e',
        '400': '#e66181',
        '500': '#df345e',
        '600': '#c42e53',
        '700': '#a72747',
        '800': '#861f38',
        '900': '#64172a',
        '950': '#3e0f1a',
      },
      warn: {
        '50': '#f9eee0',
        '100': '#f4ddc1',
        '200': '#edc89b',
        '300': '#e7b67a',
        '400': '#e0a052',
        '500': '#D78521',
        '600': '#bd751d',
        '700': '#a16419',
        '800': '#815014',
        '900': '#613c0f',
        '950': '#3c2509',
      },
    },
  },
}

export type PaletteKey = keyof typeof palettes

const current = ref<PaletteKey>(storedPalette())

export function getPalette(): PaletteKey {
  return current.value
}

export const currentPalette = computed({
  get: () => current.value,
  set: (key) => applyPalette(key as PaletteKey),
})

export function buildPreset(key: PaletteKey) {
  const palette = palettes[key]
  if (key === 'aura' || !palette) return Aura

  const { primary, light, dark, accents } = palette
  return definePreset(Aura, {
    semantic: {
      primary,
      ...accents,
      colorScheme: {
        light: { surface: light },
        dark: { surface: dark },
      },
    },
  })
}

export function applyPalette(key: PaletteKey) {
  if (!palettes[key]) return

  usePreset(buildPreset(key))

  current.value = key
  document.documentElement.dataset.palette = key
  localStorage.setItem('mt-palette', key)
}

export function storedPalette(): PaletteKey {
  const stored = localStorage.getItem('mt-palette')
  return stored && stored in palettes ? (stored as PaletteKey) : 'aura'
}
