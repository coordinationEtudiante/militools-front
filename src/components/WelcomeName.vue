<template>
  {{ hello }}
</template>

<!-- It's better than last week. It's better than xx% of users xx user in your organisation count on you-->
<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { user } = useUserStore()

const name = computed(() => user.name)

const { t } = useI18n()

let time = new Date().getHours()

setInterval(() => time++, 3_600_000)

const hello = computed(() => {
  if (time >= 9 && time < 12) {
    return t('hello.morning', { name: name.value })
  } else if (time >= 12 && time < 14) {
    return t('hello.noon', { name: name.value })
  } else if (time >= 14 && time < 19) {
    return t('hello.afternoon', { name: name.value })
  } else if (time >= 19 && time < 22) {
    return t('hello.evening', { name: name.value })
  } else if (time >= 22 || time < 7) {
    return t('hello.night', { name: name.value })
  } else {
    /*(time >= 7 && time < 9)*/
    return t('hello.awakening', { name: name.value })
  }
})
</script>
