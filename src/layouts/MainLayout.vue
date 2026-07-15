<script setup lang="ts">
defineSlots<{
  default
  headbar
}>()
</script>

<template>
  <div class="flex w-full h-full gap-2">
    <slot name="default" />
    <slot name="headbar" />
  </div>
</template>
