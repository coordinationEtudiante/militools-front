import { fetchRequest } from '@/tools/fetch.utils'

export async function testToken(): Promise<void> {
  await fetchRequest('auth/testToken', { method: 'GET' })
}
