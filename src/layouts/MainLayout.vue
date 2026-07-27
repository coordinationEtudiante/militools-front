<script setup lang="ts">
defineSlots<{
  default
  headbar
}>()
</script>

<template>
  <div class="flex h-screen gap-4 p-4">
    <slot name="headbar" />
    <slot name="default" />
  </div>
</template>
