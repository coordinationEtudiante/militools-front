<script setup lang="ts">
defineSlots<{
  default
  headbar
}>()
</script>

<template>
  <div class="flex h-full w-full gap-2">
    <slot name="headbar" />
    <slot name="default" />
  </div>
</template>
