<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { router } from '@/router'
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/menubar/sidebar.vue'

const isUser = computed(() => router.currentRoute.value.name?.startsWith('/user'))
</script>

<template>
  <MainLayout class="min-h-full">
    <template v-if="isUser" #sidebar>
      <Sidebar />
    </template>
    <RouterView class="h-full w-full" />
  </MainLayout>
</template>
