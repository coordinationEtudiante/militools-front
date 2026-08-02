import { useAreaStore } from '@/stores/area.store'
import type { ComputedRef } from 'vue'

function namesToId<T>(
  data: {
    name: string
    value: T
  }[],
): Array<{
  id: number
  value: T
}> {
  const area = useAreaStore()
  return data.map((d) => {
    return { id: area.fields.find((f) => f.name == d.name)?.id ?? -1, value: d.value }
  })
}

function FieldsToIds<T>(datas: { [key: string]: T }[]): { id: number; value: T }[][] {
  const area = useAreaStore()
  return datas.map((data) =>
    Object.keys(data).map((d) => {
      return { id: area.fields.find((f) => f.name == d)?.id ?? -1, value: data[d] as T }
    }),
  )
}

function idsToValue<T>(datas: { id: number; value: T }[][]): { [key: string]: T }[] {
  const area = useAreaStore()

  return datas.map((data) => {
    return data.reduce(
      (acc, d) => {
        const dName = area.fields.find((f) => f.id === d.id)?.name ?? 'none'
        acc[dName] = d.value
        return acc
      },
      {} as { [key: string]: T },
    )
  })
}

function cleanContactData<T>(datas: { [key: string]: T }[]): { [key: string]: T }[] {
  return datas.map((data) =>
    Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== '' && value !== null && value !== undefined,
      ),
    ),
  )
}

function getNumberValueInField(
  otherProbableFields: Array<string> | Array<{ name: string; newName?: string }>,
  name: string,
): ComputedRef<number> {
  const safeFields = Array.isArray(otherProbableFields) ? otherProbableFields : []
  const { getNumberValueRef } = useAreaStore()
  if (safeFields.length === 0) return getNumberValueRef(name)
  if (typeof safeFields[0] === 'string') return getNumberValueRef(name, safeFields as string[])
  return getNumberValueRef(
    name,
    (safeFields as { name: string; newName?: string }[]).map((o) => o.newName ?? o.name),
  )
}

export { namesToId, FieldsToIds, idsToValue, cleanContactData, getNumberValueInField }
