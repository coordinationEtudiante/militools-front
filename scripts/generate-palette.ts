import { Hct, TonalPalette } from '@material/material-color-utilities'
import { writeFileSync } from 'node:fs'

const hex = (argb: number) => '#' + argb.toString(16).padStart(8, '0').slice(2)
const argb = (s: string) => (parseInt(s.replace('#', ''), 16) | 0xff000000) >>> 0

/** shade Tailwind → tone Material (0-100) */
const TONES: Record<string, number> = {
  0: 99,
  50: 99,
  100: 95,
  200: 90,
  300: 80,
  400: 70,
  500: 60,
  600: 50,
  700: 40,
  800: 30,
  900: 20,
  950: 10,
}
/** en mode sombre la rampe est décalée d'un cran (0 = texte clair, 900 = fond) */
const TONES_DARK: Record<string, number> = {
  0: 99,
  50: 95,
  100: 90,
  200: 80,
  300: 70,
  400: 60,
  500: 50,
  600: 40,
  700: 30,
  800: 20,
  900: 10,
  950: 5,
}

const args = process.argv.slice(2)
const seed = args[0]
if (!seed)
  throw new Error(
    'usage: npx jiti scripts/generate-palette.ts "#552a86" [chroma=8] [label] [--out file.ts]',
  )
const neutralChroma = Number(args[1] ?? 8)
const label = args[2]?.startsWith('--') ? 'Palette' : (args[2] ?? 'Palette')
const outIndex = args.indexOf('--out')
const out = outIndex !== -1 ? args[outIndex + 1] : null

const src = Hct.fromInt(argb(seed))
const ramp = (hue: number, chroma: number, tones: Record<string, number>) => {
  const p = TonalPalette.fromHueAndChroma(hue, chroma)
  return Object.fromEntries(
    Object.entries(tones).map(([shade, tone]) => [shade, hex(p.tone(tone))]),
  )
}

const palette = {
  label,
  primary: ramp(src.hue, src.chroma, TONES),
  light: { ...ramp(src.hue, neutralChroma, TONES), 0: '#ffffff' },
  dark: ramp(src.hue, neutralChroma, TONES_DARK),
}

const body = JSON.stringify(palette, null, 2)

if (out) {
  writeFileSync(
    out,
    `import type { Palette } from './palettes'\n\nexport const palette: Palette = ${body}\n`,
  )
  console.log(`écrit : ${out}`)
} else {
  console.log(body)
}
