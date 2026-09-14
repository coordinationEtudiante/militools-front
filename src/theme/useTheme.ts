import { useDark, useToggle } from '@vueuse/core'
import { applyPalette, type PaletteKey } from './palettes'

export const isDark = useDark()

export const toggleDark = useToggle(isDark)

export function setPalette(key: PaletteKey) {
  applyPalette(key)
}