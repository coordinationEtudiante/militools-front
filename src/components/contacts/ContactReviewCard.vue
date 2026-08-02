<script setup lang="ts">
import ContactListInput from '@/components/contacts/ContactListInput.vue'
import { isFieldValueValid } from '@/tools/contactValidation.utils'
import { TriangleAlert, Users } from '@lucide/vue'
import { Tag } from 'primevue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  index: number
  errored: boolean
  fields: { name: string; type: string }[]
  contact: Record<string, string>
}>()

const emit = defineEmits<{
  'update:value': [name: string, value: string]
}>()

const { t } = useI18n()

const isFieldError = (field: { name: string; type: string }) =>
  !isFieldValueValid(field, props.contact[field.name])
</script>

<template>
  <div
    class="flex flex-col gap-3 rounded-xl border-2 p-3 transition-colors"
    :class="errored ? 'border-red-300 bg-red-50/60' : 'border-gray-200 bg-white'"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="flex min-w-0 items-center gap-2">
        <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          <Users class="h-4 w-4 text-gray-500" />
        </span>
        <span class="truncate text-sm font-semibold text-gray-700">
          {{ t('create-contacts.review-contact', { index }) }}
        </span>
      </div>
      <Tag
        :severity="errored ? 'danger' : 'success'"
        :value="errored ? t('error') : t('create-contacts.valid')"
        :icon="errored ? 'pi pi-exclamation-triangle' : 'pi pi-check'"
      />
    </div>

    <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div
        v-for="field in fields"
        :key="field.name"
        class="flex flex-col gap-1 rounded-lg p-1.5 transition-colors"
        :class="isFieldError(field) ? 'bg-white/70 ring-1 ring-red-400' : ''"
      >
        <label class="flex items-center justify-between gap-1 text-xs font-medium text-gray-500">
          <span class="truncate">{{ field.name }}</span>
          <span
            v-if="isFieldError(field)"
            class="flex shrink-0 items-center gap-1 font-semibold text-red-500"
          >
            <TriangleAlert class="h-3 w-3" />
            {{ t('validation.error') }}
          </span>
        </label>
        <ContactListInput
          :name="field.name"
          :type="field.type"
          :modelValue="contact[field.name]"
          @update:modelValue="(value) => emit('update:value', field.name, value)"
        />
      </div>
    </div>
  </div>
</template>
