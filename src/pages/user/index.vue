<script setup lang="ts">
import { router } from '@/router'
import { useAreaStore } from '@/stores/area.store'
import { useUserStore } from '@/stores/user.store'
import { useI18n } from 'vue-i18n'

const { user } = useUserStore()
const { getArea } = useAreaStore()

const { t } = useI18n()
</script>

<template>
  {{ t('hello-user', { username: user.name }) }}
  {{ t('connected-on', { area: getArea().name }) }}
  {{ router.currentRoute.value.name.startsWith('/user') }}
</template>
