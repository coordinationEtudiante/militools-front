import tailwindColors from 'tailwindcss/colors'

//extract all key with children
type OnlyPaletteKeys = {
  [K in keyof typeof tailwindColors]: (typeof tailwindColors)[K] extends object ? K : never
}[keyof typeof tailwindColors]

//Extracrt all simple string
type SpecialColor = {
  [K in keyof typeof tailwindColors]: (typeof tailwindColors)[K] extends string ? K : never
}[keyof typeof tailwindColors]

// cerate all variant for each color. and join simple value from specialColor
export type FullColor =
  | {
      [K in OnlyPaletteKeys]: `${K}-${Extract<keyof (typeof tailwindColors)[K], string>}`
    }[OnlyPaletteKeys]
  | SpecialColor

export type BgColor = `bg-${FullColor}`
export type BorderColor = `border-${FullColor}`
export type TextColor = `text-${FullColor}`
export type RowColor = OnlyPaletteKeys | SpecialColor
