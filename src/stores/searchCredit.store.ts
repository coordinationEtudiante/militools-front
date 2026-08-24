import { fetchResource } from '@/tools/fetch.utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
export const useSearchCreditStore = defineStore('earchCreditStore', () => {
  // State variables for tracking statistics
  const dayCredit = ref<number>(0)
  const consumedCredit = ref<number>(0)
  const acceptedExtraCredit = ref<number>(0)
  const pendingExtraCredits = ref<number>(0)
  const rejectedExtraCredits = ref<number>(0)
  const fetchDate = ref<Date>(new Date(0))
  const errored = ref<boolean>(false)
  const loading = ref<boolean>(false)

  async function fetchCredit() {
    if (loading.value) return

    loading.value = true
    try {
      const res = await fetchResource(':area/contact/getCredit')
      dayCredit.value = res.dayCredit ?? 0
      consumedCredit.value = res.consumedCredit ?? 0
      acceptedExtraCredit.value = res.acceptedExtraCredit ?? 0
      pendingExtraCredits.value = res.pendingExtraCredits ?? 0
      rejectedExtraCredits.value = res.rejectedExtraCredits ?? 0
      fetchDate.value = new Date()
      errored.value = false
    } catch (err) {
      console.error('error during request contacts: ' + err)
      errored.value = true
    }

    loading.value = false
  }

  /**
   * If a 1/3 of the credits remain, we refresh to make sure we haven't missed any.
   */
  function consumeNewCredit() {
    consumedCredit.value++
    if (
      new Date().getTime() - fetchDate.value.getTime() >= 3_600_000 ||
      (consumedCredit.value * 4) / 3 >= totalAvaibleCredit.value
    )
      fetchCredit()
  }
  // fetch data eatch hours
  const getDayCredit = computed(() => {
    if (new Date().getTime() - fetchDate.value.getTime() >= 3_600_000) fetchCredit()
    return dayCredit.value
  })

  const getConsumedCredit = computed(() => {
    if (new Date().getTime() - fetchDate.value.getTime() >= 3_600_000) fetchCredit()
    return consumedCredit.value
  })
  const getAcceptedExtraCredit = computed(() => {
    if (new Date().getTime() - fetchDate.value.getTime() >= 3_600_000) fetchCredit()
    return acceptedExtraCredit.value
  })
  const getPendingExtraCredits = computed(() => {
    if (new Date().getTime() - fetchDate.value.getTime() >= 3_600_000) fetchCredit()
    return pendingExtraCredits.value
  })
  const getRejectedExtraCredits = computed(() => {
    if (new Date().getTime() - fetchDate.value.getTime() >= 3_600_000) fetchCredit()
    return rejectedExtraCredits.value
  })

  const totalAvaibleCredit = computed(() => getDayCredit.value + getAcceptedExtraCredit.value)
  const totalRemaningCredit = computed(() => totalAvaibleCredit.value - getConsumedCredit.value)
  fetchCredit()
  return {
    getDayCredit,
    getConsumedCredit,
    getAcceptedExtraCredit,
    getPendingExtraCredits,
    getRejectedExtraCredits,
    totalAvaibleCredit,
    totalRemaningCredit,
    fetchCredit,
    consumeNewCredit,
  }
})
