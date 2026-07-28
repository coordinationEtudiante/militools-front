import { reactiveFetch } from '@/tools/fetch.utils'

export function createImage(file: File, alt?: string, immediate = true) {
  const formData = new FormData()
  formData.append('file', file)
  if (alt) formData.append('alt', alt)
  return reactiveFetch(':area/image/create', { body: formData, immediate })
}
