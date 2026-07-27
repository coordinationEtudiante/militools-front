<template>
  <Card class="action-card">
    <template #header>
      <Skeleton shape="rectangle" width="370px" height="208px"></Skeleton>
    </template>

    <template #title><Skeleton width="15rem" /></template>

    <template #subtitle>
      <div class="subtitle">
        <div class="placment">
          <Skeleton height=".5rem" width="17rem" />
        </div>
        <div class="group">
          <Skeleton height=".3rem" width="10rem" />
        </div>
      </div>
    </template>

    <template #content><Skeleton /></template>

    <template #footer>
      <span class="footer" v-if="type === 'default'">
        <Button severity="success" disabled>{{ t('button.participate') }}</Button>
        <Button severity="warn" disabled>{{ t('button.not-participate') }}</Button>
      </span>
      <span class="footer" v-else>
        <!-- share ? -->
        <Button severity="danger" disabled>{{ t('button.give-up') }}</Button>
      </span>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
defineProps<{ type: 'registred' | 'default' }>()
</script>
