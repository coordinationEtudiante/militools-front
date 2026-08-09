import { useAreaStore } from '@/stores/area.store'

export type ContactFieldType = {
  name: string
  type: string
}

export function isFieldValueValid(
  field: ContactFieldType,
  value: string | undefined | null,
): boolean {
  if (value === undefined || value === null || value === '') return true

  const validator = useAreaStore().contactTypeValidator.get(field.type)
  return validator ? validator.test(value) : true
}

export function getInvalidFields(
  fields: ContactFieldType[],
  contact: Record<string, string>,
): string[] {
  return fields
    .filter((field) => !isFieldValueValid(field, contact[field.name]))
    .map((field) => field.name)
}

export function isContactValid(
  fields: ContactFieldType[],
  contact: Record<string, string>,
): boolean {
  return getInvalidFields(fields, contact).length === 0
}
