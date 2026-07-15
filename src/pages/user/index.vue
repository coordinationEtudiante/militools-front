<script setup lang="ts">
import { useAreaStore } from '@/stores/area.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'

const { user } = useUserStore()
const { getArea } = useAreaStore()

const { t } = useI18n()

const area = getArea()
console.log(area)
</script>

<template>
  {{ t('hello-user', { username: user.name }) }}
  {{ t('connected-on', { area: getArea().name }) }}
</template>
