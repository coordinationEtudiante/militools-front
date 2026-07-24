import { listAction as fetchActions } from '@/cloud-functions/actions/list'
import { setActionResponse as fetchSetActionResponse } from '@/cloud-functions/actions/setActionResponse'
import type { CloudFunctionResponse } from '@/types/cloud-functions'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type Action = CloudFunctionResponse<':area/action/list'>[number]

export const useActionStore = defineStore('action', () => {
  const actions = ref<Action[]>([])
  const loading = ref(false)
  const errored = ref(false)

  const getParticipatingAction = computed(() => actions.value.filter((a) => a.awnser !== null))

  const GetNotParticipatingAction = computed(() => actions.value.filter((a) => a.awnser === null))

  async function reloadActions() {
    loading.value = true
    errored.value = false

    try {
      const req = fetchActions()
      await req.loadingPromise.value

      if (req.error.value || !req.data.value) {
        errored.value = true
        return
      }

      actions.value = req.data.value
    } catch {
      errored.value = true
    } finally {
      loading.value = false
    }
  }

  function getActionById(id: number) {
    return actions.value.find((a) => a.id === id) ?? null
  }

  async function setActionResponse(actionId: number, awnser: boolean | null) {
    const req = fetchSetActionResponse({ actionId, awnser })
    await req.loadingPromise.value

    if (req.error.value || !req.data.value) {
      errored.value = true
      return
    }

    const index = actions.value.findIndex((a) => a.id === actionId)
    if (index !== -1) {
      actions.value[index] = { ...actions.value[index], awnser }
    }
  }

  return {
    actions,
    loading,
    errored,
    getParticipatingAction,
    GetNotParticipatingAction,
    reloadActions,
    getActionById,
    setActionResponse,
  }
})
