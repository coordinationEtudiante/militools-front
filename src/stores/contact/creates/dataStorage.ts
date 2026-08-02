let value: Array<{ [key: string]: string }> = []
let type: Array<{ name: string; type: string }> = []
let edit: Array<{ contactId: number; data: Array<{ id: number; value: string }> }> = []
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

    try {
      // Convert Proxy or unexpected structures to plain objects
      value = JSON.parse(JSON.stringify(newData))
      type = JSON.parse(JSON.stringify(newType))
    } catch (error) {
      console.error('Failed to set data in DataStorage:', error)
    }
    value = newData
    type = newType
  },

  setEdit(newEdit: Array<{ contactId: number; data: Array<{ id: number; value: string }> }>) {
    edit = newEdit
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
  },

  getEdit() {
    return edit
  },
}
