import { useAreaStore } from '@/stores/area.store'

export type ContactFieldType = {
  name: string
  type: string
}

/**
 * @summary Extracts the selectable options of an enum field type.
 *
 * Enum types are detected by a type name starting with "enum". Their validation
 * regex follows the shape /^(?:A|B|C)$/ from which the alternation is extracted.
 *
 * @param type - The field type name.
 * @param validator - The validation regex of this field type.
 * @returns The list of selectable enum values, empty when not an enum or unparseable.
 */
export function extractEnumOptions(type: string, validator: RegExp | undefined): string[] {
  if (!type.startsWith('enum') || !validator) return []

  const match = validator.source.match(/^\^\(\?:([\s\S]*)\)\$$/)
  if (!match) return []

  return match[1]
    .split('|')
    .map((option) => option.replace(/\\([()\\])/g, '$1').trim())
    .filter(Boolean)
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
