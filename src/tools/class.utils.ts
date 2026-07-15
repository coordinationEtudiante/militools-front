import type { BgColor, BorderColor, RowColor, TextColor } from '@/types/tailwindColor'

export type Accent = 'info' | 'success' | 'warning' | 'danger'

function accentToColor(accent: Accent): RowColor {
  switch (accent) {
    case 'info':
      return 'blue'
    case 'success':
      return 'green'
    case 'warning':
      return 'yellow'
    case 'danger':
      return 'red'
  }
}

function accentToTitleColor(accent: Accent): TextColor {
  switch (accent) {
    case 'info':
      return 'text-blue-900'
    case 'success':
      return 'text-green-900'
    case 'warning':
      return 'text-yellow-900'
    case 'danger':
      return 'text-red-900'
  }
}

function accentToSubtitleColor(accent: Accent): TextColor {
  switch (accent) {
    case 'info':
      return 'text-blue-700'
    case 'success':
      return 'text-green-700'
    case 'warning':
      return 'text-yellow-700'
    case 'danger':
      return 'text-red-700'
  }
}

function accentToBorder(accent: Accent): BorderColor {
  switch (accent) {
    case 'info':
      return 'border-blue-700'
    case 'success':
      return 'border-green-700'
    case 'warning':
      return 'border-yellow-700'
    case 'danger':
      return 'border-red-700'
  }
}

function accentToBacground(accent: Accent): BgColor {
  switch (accent) {
    case 'info':
      return 'bg-blue-50'
    case 'success':
      return 'bg-green-50'
    case 'warning':
      return 'bg-yellow-50'
    case 'danger':
      return 'bg-red-50'
  }
}

export {
  accentToColor,
  accentToTitleColor,
  accentToSubtitleColor,
  accentToBorder,
  accentToBacground,
}
