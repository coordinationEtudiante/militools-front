<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { router } from '@/router'
import { computed } from 'vue'
import Sidebar from '@/components/menubar/Sidebar.vue'
import { RouterView } from 'vue-router'

const isUser = computed(() => router.currentRoute.value.name?.startsWith('/user'))
</script>

<template>
  <MainLayout class="min-h-full w-full overflow-y-auto">
    <template v-if="isUser">
      <Sidebar />
    </template>
    <RouterView />
  </MainLayout>
</template>

<style scoped></style>
