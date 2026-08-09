import { toRaw } from 'vue'

let value: Array<{ [key: string]: string }> = []
let type: Array<{ name: string; type: string }> = []
let edit: Array<{ contactId: number; data: Array<{ id: number; value: string }> }> = []

function deepPlain<T>(data: T): T {
  const raw = toRaw(data)
  if (Array.isArray(raw)) {
    return raw.map((item) => deepPlain(item)) as unknown as T
  }
  if (raw !== null && typeof raw === 'object') {
    const result: Record<string, unknown> = {}
    for (const key of Object.keys(raw)) {
      result[key] = deepPlain((raw as Record<string, unknown>)[key])
    }
    return result as T
  }
  return raw as T
}

export const DataStorage = {
  setArray(
    newData: Array<{ [key: string]: string }>,
    newType: Array<{ name: string; type: string }>,
  ) {
    if (!Array.isArray(newData) || !Array.isArray(newType)) {
      console.error('Invalid data format: newData and newType must be arrays.', {
        newData,
        newType,
      })
      return
    }

    value = deepPlain(newData)
    type = deepPlain(newType)
  },

  setEdit(newEdit: Array<{ contactId: number; data: Array<{ id: number; value: string }> }>) {
    edit = deepPlain(newEdit)
  },

  getValue() {
    return value
  },

  getType() {
    return type
  },

  clear() {
    value = []
    type = []
    edit = []
  },

  getEdit() {
    return edit
  },
}
