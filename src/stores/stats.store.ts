import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { logicOr } from '@vueuse/math'
import { useLocalStorage } from '@vueuse/core'
import { fetchResource } from '@/tools/fetch.utils'

export const useStatsStore = defineStore('StatsStore', () => {
  // State variables for tracking statistics
  const stats = useLocalStorage('stats', { nbUser: 0, nbValue: 0, fetchDate: new Date(0) })
  const errored = ref<boolean>(false)
  const loading = ref<boolean>(false)

  async function hydrateStats() {
    try {
      if (stats.value) {
        try {
          if (typeof stats === 'object' && stats !== null) {
            if (stats.value.fetchDate) {
              const dateString = String(stats.value.fetchDate)
              stats.value.fetchDate = new Date(dateString)
            } else {
              stats.value.fetchDate = new Date()
            }
            stats.value.nbUser = stats.value.nbUser || 0
            stats.value.nbValue = stats.value.nbValue || 0

            //if fetch is too old stop hydrate and fetch
            if (new Date().getTime() - stats.value.fetchDate.getTime() >= 3_600_000)
              return fetchStats()
          }
        } catch (parseError) {
          console.warn('StatsStore: Could not parse stored stats data. Using defaults.', parseError)
        }
      }
    } catch (e) {
      console.warn(e)
      await fetchStats()
    }
  }

  async function fetchStats() {
    if (loading.value) return

    loading.value = true
    try {
      const res = await fetchResource(':area/stats/contactStats')
      stats.value.nbUser = res.contactCount
      stats.value.nbValue = res.totalValue
      stats.value.fetchDate = new Date()
      errored.value = false
    } catch (e) {
      console.error('error during request contacts: ' + e)
      errored.value = true
      stats.value.fetchDate = new Date()
    }
    loading.value = false
  }

  // fetch data eatch hours
  const getNbUser = computed(() => {
    if (new Date().getTime() - stats.value.fetchDate.getTime() >= 3_600_000) fetchStats()
    return stats.value.nbUser
  })

  const getnbValue = computed(() => {
    if (new Date().getTime() - stats.value.fetchDate.getTime() >= 3_600_000) fetchStats()
    return stats.value.nbValue
  })

  const isReady = logicOr(errored, loading)

  hydrateStats()

  return {
    getNbUser,
    getnbValue,
    errored,
    loading,
    isReady,
  }
})
