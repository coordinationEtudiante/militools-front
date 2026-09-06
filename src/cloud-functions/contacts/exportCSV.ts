import { useAreaStore } from '@/stores/area.store'
import { useUserStore } from '@/stores/user.store'
import { getBaseUrl } from '@/tools/fetch.utils'
import type { ExportCSVQuery } from '@/types/cloud-functions/contacts/exportCSV.type'

export async function exportContactCSV(options?: { fields?: string; inTrash?: boolean }) {
  const query: ExportCSVQuery = {}
  if (options?.fields) query.fields = options.fields
  if (options?.inTrash) query.inTrash = 'true'

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) params.append(key, String(value))
  }
  const qs = params.toString()

  const { getArea } = useAreaStore()
  const { token } = useUserStore()
  const response = await fetch(
    new URL(`/${getArea().id}/contact/exportCSV${qs ? `?${qs}` : ''}`, getBaseUrl()),
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'same-origin',
    },
  )

  if (!response.ok) {
    throw new Error(`Export CSV failed with status ${response.status}`)
  }

  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'contacts.csv'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
