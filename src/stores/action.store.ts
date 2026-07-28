import { fetchResource } from '@/tools/fetch.utils'
import type { CloudFunctionResponse } from '@/types/cloud-functions'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type Action = CloudFunctionResponse<':area/action/list'>[number]

export const useActionStore = defineStore('action', () => {
  const actions = ref<Action[]>([])
  const loading = ref(false)
  const errored = ref(false)
  const errorMessage = ref<string | null>(null)

  const getParticipatingAction = computed(
    () => (actions.value.filter((a) => a.awnser !== null) ?? []) as Action[],
  )

  const GetNotParticipatingAction = computed(
    () => actions.value.filter((a) => a.awnser === null) as Action[],
  )

  async function reloadActions(
    granularity: 'day' | 'week' | 'month' | 'year' | 'custom' = 'week',
  ): Promise<void> {
    loading.value = true
    errored.value = false
    errorMessage.value = null

    try {
      actions.value = await fetchResource(':area/action/list', { query: { granularity } })
    } catch (e) {
      errored.value = true
      errorMessage.value = e instanceof Error ? e.message : 'Unknown error'
      throw e
    } finally {
      loading.value = false
    }
  }

  function getActionById(id: number) {
    return actions.value.find((a) => a.id === id) ?? null
  }

  async function setActionResponse(actionId: number, awnser: boolean | null) {
    try {
      await fetchResource(':area/action/respond', {
        body: { actionId, awnser },
      })
    } catch (e) {
      errored.value = true
      errorMessage.value = e instanceof Error ? e.message : 'Unknown error'
      return
    }

    const index = actions.value.findIndex((a) => a.id === actionId)
    if (index !== -1) {
      actions.value[index] = { ...actions.value[index], awnser }
    }
  }

  reloadActions()

  return {
    actions,
    loading,
    errored,
    errorMessage,
    getParticipatingAction,
    GetNotParticipatingAction,
    reloadActions,
    getActionById,
    setActionResponse,
  }
})
