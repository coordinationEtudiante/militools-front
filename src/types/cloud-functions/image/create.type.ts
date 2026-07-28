import type { FetchDefault } from '../FetchDefault.type'

export const createImageMethod = 'POST' as const
export type createImage = FetchDefault<
  { file: File; alt?: string },
  {
    id: number
    originalName: string
    alt: string | null
    mimeType: string
    width: number
    height: number
    size: number
    area: number
    creator: number
  },
  Record<string, never>,
  typeof createImageMethod
>
