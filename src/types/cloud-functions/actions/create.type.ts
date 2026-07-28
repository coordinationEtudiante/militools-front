import type { FetchDefault } from '../FetchDefault.type'

export const createActionMethod = 'POST' as const
export type createAction = FetchDefault<
  {
    title: string
    dateStart: Date
    dateEnd: Date
    description?: string
    descriptionEvent?: string
    location?: { x: number; y: number }
    locationName?: string
    image?: string
  },
  {
    id: number
    title: string
    area: number
    location: {
      x: number
      y: number
    }
    locationName: string | null
    description: string | null
    descriptionEvent: string | null
    dateStart: Date
    dateEnd: Date
    image: string | null
  },
  Record<string, never>,
  typeof createActionMethod
>
