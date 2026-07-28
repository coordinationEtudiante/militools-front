import type { FetchDefault } from '../FetchDefault.type'

export const listActionMethod = 'GET' as const
export type listAction = FetchDefault<
  Record<string, never>,
  {
    awnser: boolean | null
    image: {
      id: string
      alt: string | null
      originalName: string
      mimeType: string
      createdAt: Date
      width: number
      height: number
      size: number
      area: number
      creator: number
    } | null
    id: number
    title: string
    area: number
    description: string | null
    descriptionEvent: string | null
    location: {
      x: number
      y: number
    }
    locationName: string | null
    dateStart: Date
    dateEnd: Date
  }[],
  {
    granularity: 'day' | 'week' | 'month' | 'year' | 'custom'
    limit?: [string | number | Date, string | number | Date]
  },
  typeof listActionMethod
>
