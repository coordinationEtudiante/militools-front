export type MergeField = {
  name: string
  serverId?: number
  type: string
  local: string
  server: string
  final: string
  autoResolved: boolean
}

export type MergeDuplicate = {
  index: number
  remoteIndex: number
  duplicateOf: { id: number; name: string; value: string }[]
  status: 'auto-resolved' | 'resolved' | 'to-resolved'
}
