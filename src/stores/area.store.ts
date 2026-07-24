import { getArea as fetchAreas } from '@/cloud-functions/areas/getArea'
import { getContactFields } from '@/cloud-functions/contacts/getFields'
import { router } from '@/router'
import type { getAreaFetch } from '@/types/cloud-functions/areas/getArea.type'
import type { getContactFieldsFetch } from '@/types/cloud-functions/contacts/getContactFields'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type StoredSession = {
  areas: getAreaFetch['res']
  fields: getContactFieldsFetch['res']['fields']
  validator: getContactFieldsFetch['res']['validator']
  selectedArea: number
}

const STORAGE_KEY = 'militools:areas-session'

function hasCompleteSession(session: StoredSession | null): session is StoredSession {
  return Boolean(session?.areas.length && session.fields.length)
}

export const useAreaStore = defineStore('area', () => {
  const storeSession = useStorage<StoredSession | null>(STORAGE_KEY, null, undefined, {
    serializer: StorageSerializers.object,
  })
  const loading = ref<boolean>(false)
  const errored = ref<boolean>(false)
  const hydratePromise = ref<Promise<StoredSession | null> | null>(null)

  const areas = computed(() => storeSession.value?.areas ?? [])
  const fields = computed(() => storeSession.value?.fields ?? [])
  const selectedArea = computed(() => storeSession.value?.selectedArea)

  async function loadFields(areaId: number) {
    const fieldsRequest = getContactFields(areaId)

    await fieldsRequest.loadingPromise.value

    const fetchedFields = fieldsRequest.data.value?.fields ?? []
    const validator = fieldsRequest.data.value?.validator ?? []

    if (!fetchedFields.length || !validator.length) {
      storeSession.value = null
      errored.value = true
      await router.replace('/area/no-joined')
      return null
    }

    return { fetchedFields, validator }
  }

  async function buildSession() {
    const areaRequest = fetchAreas()

    await areaRequest.loadingPromise.value

    const fetchedAreas = areaRequest.data.value ?? []

    if (!fetchedAreas.length) {
      storeSession.value = null
      errored.value = true
      await router.replace('/area/no-joined')
      return null
    }

    const previousSelectedArea = storeSession.value?.selectedArea
    const nextSelectedArea =
      fetchedAreas.find((area) => area.id === previousSelectedArea)?.id ?? fetchedAreas[0]!.id

    storeSession.value = {
      areas: fetchedAreas,
      fields: [],
      selectedArea: nextSelectedArea,
      validator: [],
    }
    const fieldsResult = await loadFields(nextSelectedArea)

    if (!fieldsResult) {
      return null
    }

    const { fetchedFields, validator } = fieldsResult

    const nextSession: StoredSession = {
      areas: fetchedAreas,
      fields: fetchedFields,
      selectedArea: nextSelectedArea,
      validator,
    }

    storeSession.value = nextSession
    errored.value = false
    return nextSession
  }

  async function hydrate() {
    if (hasCompleteSession(storeSession.value)) {
      const nextSelectedArea = storeSession.value.areas.find(
        (area) => area.id === storeSession.value?.selectedArea,
      )

      if (!nextSelectedArea) {
        const fallbackAreaId = storeSession.value.areas.at(0)!.id
        storeSession.value = {
          ...storeSession.value,
          selectedArea: fallbackAreaId,
          fields: [],
        }

        const fieldsResult = await loadFields(fallbackAreaId)

        if (!fieldsResult) {
          return null
        }

        storeSession.value = {
          ...storeSession.value,
          fields: fieldsResult.fetchedFields,
        }
      } else if (storeSession.value.fields.some((field) => field.area !== nextSelectedArea.id)) {
        const fieldsResult = await loadFields(nextSelectedArea.id)

        if (!fieldsResult) {
          return null
        }

        storeSession.value = {
          ...storeSession.value,
          fields: fieldsResult.fetchedFields,
        }
      }

      return storeSession.value
    }

    if (hydratePromise.value) {
      return hydratePromise.value
    }

    loading.value = true
    hydratePromise.value = buildSession().finally(() => {
      loading.value = false
      hydratePromise.value = null
    })

    return hydratePromise.value
  }

  async function setSelectedArea(areaId: number) {
    if (!storeSession.value?.areas.some((area) => area.id === areaId)) {
      throw router.replace('/area/no-joined')
    }

    storeSession.value = {
      ...storeSession.value,
      selectedArea: areaId,
      fields: [],
    }

    const fieldsResult = await loadFields(areaId)

    if (!fieldsResult || !storeSession.value) {
      return null
    }

    storeSession.value = {
      ...storeSession.value,
      fields: fieldsResult.fetchedFields,
    }

    return storeSession.value
  }

  function getArea(areaId?: number) {
    const area = areas.value.filter((a) => a.id === (areaId ?? selectedArea.value)).at(0)
    if (!area) {
      throw router.replace('/area/no-joined')
    }
    return area
  }

  function getAreaField(areaId?: number) {
    const area = fields.value.filter((f) => f.area === (areaId ?? selectedArea.value)).at(0)
    if (!area) {
      throw router.replace('/area/no-joined')
    }
    return area
  }

  void hydrate()

  return {
    loading,
    errored,
    areas,
    getArea,
    fields,
    getAreaField,
    setSelectedArea,
  }
})
