import type { FetchDefault } from '../FetchDefault.type'

export const createContactFieldsMethod = 'POST' as const
export type createContactFieldsFetch = FetchDefault<
  {
    name: string
    description: string
    type: string
    significance: 'primary' | 'indexed' | 'other'
    defaultValue?: string
  },
  { id: number; message: string },
  Record<string, never>,
  typeof createContactFieldsMethod
>
