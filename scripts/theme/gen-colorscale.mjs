#!/usr/bin/env node
// Palette scale generator — same math as src/theme/palettes.ts
//
// Usage:
//   node scripts/theme/gen-colorscale.mjs scale #552a86              primary / accent scale (500 = base)
//   node scripts/theme/gen-colorscale.mjs light #f8f5f1              light surface (100 = base)
//   node scripts/theme/gen-colorscale.mjs dark 0=#f6f3f8 300=#b5a2c5 600=#50376a 900=#2b1736 950=#1d0f26
//
// Output format matches palettes.ts so you can paste it directly.

const hex = (h) => ({
  r: parseInt(h.slice(1, 3), 16),
  g: parseInt(h.slice(3, 5), 16),
  b: parseInt(h.slice(5, 7), 16),
})
const toHex = ({ r, g, b }) =>
  '#' + [r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
    .join('')

// linear interpolation in sRGB, 0 = a, 1 = b
const mix = (a, b, t) => {
  const ca = hex(a)
  const cb = hex(b)
  return toHex({ r: ca.r + (cb.r - ca.r) * t, g: ca.g + (cb.g - ca.g) * t, b: ca.b + (cb.b - ca.b) * t })
}

// primary / accent: 500 = base, 50-400 toward white, 600-950 toward black
const TO_WHITE = [0.86, 0.72, 0.55, 0.40, 0.22, 0]
const TO_BLACK = [0.12, 0.25, 0.40, 0.55, 0.72]
function scale(base) {
  const steps = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  const out = {}
  TO_WHITE.forEach((t, i) => (out[steps[i]] = t === 0 ? base : mix(base, '#ffffff', t)))
  TO_BLACK.forEach((t, i) => (out[steps[i + 6]] = mix(base, '#000000', t)))
  return out
}

// light surface: 0 = pure white, 100 = base, 200-950 darken toward black
const DARKEN = [
  ['200', 0.07], ['300', 0.14], ['400', 0.22], ['500', 0.32],
  ['600', 0.42], ['700', 0.53], ['800', 0.65], ['900', 0.78], ['950', 0.90],
]
function lightSurface(base) {
  const out = { '0': '#ffffff', '50': mix(base, '#ffffff', 0.55), '100': base }
  for (const [step, t] of DARKEN) out[step] = mix(base, '#000000', t)
  return out
}

// dark surface: piecewise linear between anchors {0, 300, 600, 900, 950}
function darkSurface(anchors) {
  const tween = (a, b, t) => mix(anchors[a], anchors[b], t)
  return {
    '0': anchors[0],
    '50': tween(0, 300, 50 / 300),
    '100': tween(0, 300, 100 / 300),
    '200': tween(0, 300, 200 / 300),
    '300': anchors[300],
    '400': tween(300, 600, 100 / 300),
    '500': tween(300, 600, 200 / 300),
    '600': anchors[600],
    '700': tween(600, 900, 100 / 300),
    '800': tween(600, 900, 200 / 300),
    '900': anchors[900],
    '950': tween(900, 950, 0.5),
  }
}

const print = (title, o) => {
  console.log(`\n=== ${title} ===`)
  for (const [k, v] of Object.entries(o)) console.log(`      '${k}': '${v}'`)
  console.log(Object.values(o).join(' '))
}

const [mode, ...args] = process.argv.slice(2)
const VALID = /^#[0-9a-f]{6}$/i

if (!mode || !args.length) {
  console.log(`Usage:
  node scripts/theme/gen-colorscale.mjs scale <hex>               primary / accent (500 = base)
  node scripts/theme/gen-colorscale.mjs light <hex>               light surface (100 = base)
  node scripts/theme/gen-colorscale.mjs dark <n>=<hex> ...        dark surface from 2+ anchors (use 0/300/600/900/950)`)
  process.exit(0)
}

try {
  if (mode === 'scale' || mode === 'light') {
    const base = args[0]
    if (!VALID.test(base)) throw new Error(`invalid hex: ${base}`)
    print(`${mode} ${base}`, mode === 'scale' ? scale(base) : lightSurface(base))
  } else if (mode === 'dark') {
    const anchors = {}
    for (const arg of args) {
      const [n, h] = arg.split('=')
      if (!VALID.test(h)) throw new Error(`invalid hex: ${h}`)
      anchors[n] = h
    }
    print('dark surface', darkSurface(anchors))
  } else {
    throw new Error(`unknown mode: ${mode}`)
  }
} catch (e) {
  console.error(`Error: ${e.message}`)
  process.exit(1)
}