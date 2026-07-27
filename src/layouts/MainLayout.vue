<script setup lang="ts">
defineSlots<{
  default
  headbar
}>()
</script>

<template>
  <div class="m-4 flex h-full gap-4">
    <slot name="headbar" />
    <slot name="default" />
  </div>
</template>
