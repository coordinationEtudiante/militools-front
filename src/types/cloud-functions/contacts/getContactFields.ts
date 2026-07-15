import type { FetchDefault } from '../FetchDefault.type'

export type getContactFieldsFetch = FetchDefault<
  Record<string, never>,
  {
    fields: {
      id: number
      name: string
      type: string
      description: string | null
      defaultValue: string | null
      primary: boolean
      indexed: boolean
      area: number
    }[]
    validator: string[][]
  },
  Record<string, never>,
  'GET'
>
