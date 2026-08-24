<script setup lang="ts">
defineSlots<{
  default
  sidebar
}>()
</script>

<template>
  <div class="flex h-screen flex-col-reverse gap-4 p-4 md:flex-row">
    <slot name="sidebar" />
    <slot name="default" />
  </div>
</template>
