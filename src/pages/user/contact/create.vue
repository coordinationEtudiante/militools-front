<script setup lang="ts">
import { createContact } from '@/cloud-functions/contacts/create'
import { editContact } from '@/cloud-functions/contacts/edit'
import ContactCreationInput from '@/components/contacts/ContactCreationInput.vue'
import CreateField from '@/components/contacts/CreateField.vue'
import MCard from '@/components/MCard.vue'
import { router } from '@/router'
import { useAreaStore } from '@/stores/area.store'
import { useToast } from '@nuxt/ui/composables/useToast'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { CirclePlus } from '@lucide/vue'
import { usePermStore } from '@/stores/perm.store'
import { clearPhone } from '@/tools/phone.utils'
import { fetchError } from '@/errors/fetch.error'
import { useEventListener } from '@vueuse/core'

const { t } = useI18n()
const toast = useToast()

const area = useAreaStore()
const { getPerms } = usePermStore()

getPerms([
  ':area/contact/creates',
  ':area/contact/edits',
  ':area/contact/getContactFields',
  ':area/contact/getDuplicate',
])

useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
    e.preventDefault()
    createContactFn()
  }
})

const fields = computed(() => area.fields)

const values = ref<Record<number, string>>({})
const errors = ref<Record<number, boolean>>({})
const editMode = ref(false)
const autoCompletedContactId = ref<number | null>(null)
const selectedPrimaryFields = ref<typeof area.fields>([])
const selectedIndexedFields = ref<typeof area.fields>([])
const selectedOtherFields = ref<typeof area.fields>([])
const showCreateFieldsModal = ref(false)
const creationLabel = ref<'one' | 'many'>('one')
const frozenFields = ref<Record<number, boolean>>({})
const isLoading = ref(false)

const isCreateButtonDisabled = computed(() => {
  return Object.values(values.value).every((v) => !v) || Object.values(errors.value).some((v) => v)
})

watch(
  () => area.fields,
  (newFields) => {
    const newValues = { ...values.value }
    const newErrors = { ...errors.value }
    newFields.forEach((field) => {
      if (!(field.id in newValues)) {
        newValues[field.id] = field.defaultValue ?? ''
      }
      if (!(field.id in newErrors)) {
        newErrors[field.id] = false
      }
    })
    values.value = newValues
    errors.value = newErrors
  },
  { immediate: true },
)

const buttonItems = computed(() => [
  {
    label: t('create-contact'),
    onSelect: () => {
      creationLabel.value = 'one'
    },
  },
  {
    label: t('create-contacts'),
    onSelect: () => {
      creationLabel.value = 'many'
    },
  },
])

function toggleModalCreateField() {
  showCreateFieldsModal.value = true
}

async function createContactFn() {
  isLoading.value = true
  const fieldTypes = new Map(fields.value.map((f) => [f.id, f.type]))
  const formattedValues = Object.entries(values.value)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => ({
      id: Number(key),
      value: fieldTypes.get(Number(key)) === 'phone' ? clearPhone(value) : value,
    }))

  try {
    const result =
      editMode.value && autoCompletedContactId.value !== null
        ? editContact(autoCompletedContactId.value, formattedValues, false)
        : createContact(formattedValues, false)
    await result.doFetch()

    if (result.errorCode.value && result.errorCode.value !== 200) {
      toast.add({
        color: 'error',
        title: editMode.value ? t('contact.edit.error') : t('contact.create.error'),
        description: contactErrorDetail(result.error.value) || undefined,
        duration: 3000,
      })
      return
    }

    toast.add({
      color: 'success',
      title: editMode.value ? t('contact.edit.success') : t('contact.create.success'),
      duration: 3000,
    })

    if (creationLabel.value === 'one') {
      await router.push('/user/contact')
    } else {
      const newValues: Record<number, string> = {}
      for (const [key, val] of Object.entries(values.value)) {
        const fieldId = Number(key)
        if (frozenFields.value[fieldId]) {
          newValues[fieldId] = val
        } else {
          newValues[fieldId] = ''
        }
      }
      values.value = newValues
      errors.value = {}
      editMode.value = false
      autoCompletedContactId.value = null
    }
  } catch (e) {
    toast.add({
      color: 'error',
      title: editMode.value ? t('contact.edit.error') : t('contact.create.error'),
      description: contactErrorDetail(e) || undefined,
      duration: 3000,
    })
  } finally {
    isLoading.value = false
  }
}

function contactErrorDetail(error: unknown): string {
  const message =
    error instanceof fetchError ? error.message : error instanceof Error ? error.message : ''
  const duplicate = message.match(/^Duplicate entry for primary field: (.+)$/)
  if (duplicate) {
    return t(editMode.value ? 'contact.edit.error.duplicate' : 'contact.create.error.duplicate', {
      field: duplicate[1],
    })
  }
  return message
}

function updateField(id: number, val: string) {
  values.value = { ...values.value, [id]: val }
}

function updateValues(newValues: { field: number; value: string }[]) {
  const newObj = { ...values.value }
  newValues.forEach(({ field, value }) => {
    newObj[field] = value
  })
  values.value = newObj
}

function handleAutofilledContact(contactId: number) {
  autoCompletedContactId.value = contactId
  editMode.value = true
}

watch(
  () => area.primaryFields,
  (newFields) => {
    selectedPrimaryFields.value = [...newFields]
  },
  { immediate: true },
)

watch(
  () => area.indexedFields,
  (newFields) => {
    selectedIndexedFields.value = [...newFields]
  },
  { immediate: true },
)

watch(
  () => area.otherFields,
  (newFields) => {
    selectedOtherFields.value = [...newFields]
  },
  { immediate: true },
)
</script>

<template>
  <MCard class="w-full">
    <template #header>
      <h2 class="text-2xl tracking-tighter text-balance text-highlighted">
        {{ t('create-contact.title') }}
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <p class="text-sm text-muted">
        {{ t('contact.creation.summary') }}
      </p>

      <CreateField v-model:visible="showCreateFieldsModal" />

      <div v-if="fields.length === 0" class="py-4">
        <UButton @click="toggleModalCreateField">{{ t('no-fields-open-modal') }}</UButton>
      </div>

      <div class="order-2 flex flex-col flex-wrap gap-4 md:flex-row">
        <ContactCreationInput
          v-for="primaryField in selectedPrimaryFields"
          :key="primaryField.id"
          v-bind="primaryField"
          significance="primary"
          :modelValue="values[primaryField.id] ?? ''"
          :frozen="frozenFields[primaryField.id] ?? false"
          :showLock="creationLabel === 'many'"
          @update:modelValue="(val) => updateField(primaryField.id, val)"
          @error="(val) => (errors[primaryField.id] = val)"
          @update:providedField="updateValues"
          @autofilledContact="handleAutofilledContact"
          @update:frozen="(val) => (frozenFields[primaryField.id] = val)"
        />
      </div>

      <div class="order-4 flex flex-col flex-wrap gap-4 md:flex-row">
        <ContactCreationInput
          v-for="indexedField in selectedIndexedFields"
          :key="indexedField.id"
          v-bind="indexedField"
          significance="recomended"
          :modelValue="values[indexedField.id] ?? ''"
          :frozen="frozenFields[indexedField.id] ?? false"
          :showLock="creationLabel === 'many'"
          @update:modelValue="(val) => updateField(indexedField.id, val)"
          @error="(val) => (errors[indexedField.id] = val)"
          @update:providedField="updateValues"
          @autofilledContact="handleAutofilledContact"
          @update:frozen="(val) => (frozenFields[indexedField.id] = val)"
        />
      </div>

      <div class="order-6 flex flex-col flex-wrap gap-4 md:flex-row">
        <ContactCreationInput
          significance="other"
          v-for="otherField in selectedOtherFields"
          :key="otherField.id"
          v-bind="otherField"
          :modelValue="values[otherField.id] ?? ''"
          :frozen="frozenFields[otherField.id] ?? false"
          :showLock="creationLabel === 'many'"
          @update:modelValue="(val) => updateField(otherField.id, val)"
          @error="(val) => (errors[otherField.id] = val)"
          @update:frozen="(val) => (frozenFields[otherField.id] = val)"
        />
      </div>

      <div class="order-7 flex flex-col items-center gap-4 pt-8">
        <label
          v-if="autoCompletedContactId !== null"
          class="flex cursor-pointer items-center gap-2 text-sm text-default"
        >
          <USwitch v-model="editMode" />
          <span>{{ t('create-contact.edit-existing') }}</span>
        </label>
        <UAlert v-if="editMode" color="info" class="w-full">
          {{ t('contact.edit.message') }}
        </UAlert>
        <div class="flex items-center gap-2">
          <UButton
            color="primary"
            variant="solid"
            :disabled="isCreateButtonDisabled || isLoading"
            @click="createContactFn"
          >
            {{ creationLabel === 'one' ? t('create-contact') : t('create-contacts') }}
          </UButton>
          <UDropdownMenu :items="buttonItems">
            <UButton color="primary" variant="solid" :disabled="isCreateButtonDisabled || isLoading" icon="i-lucide-chevron-down" />
          </UDropdownMenu>
        </div>
      </div>

      <USeparator class="order-1">
        <div class="flex items-center gap-2">
          <span>{{ t('primary.description') }}</span>
          <USelectMenu
            multiple
            v-model="selectedPrimaryFields"
            :items="area.primaryFields as any"
            value-key="id"
            label-key="name"
            :max="3"
            class="min-w-48"
          />
          <UButton variant="ghost" color="neutral" @click="toggleModalCreateField">
            <CirclePlus />
          </UButton>
        </div>
      </USeparator>

      <USeparator class="order-3">
        <div class="flex items-center gap-2">
          <span>{{ t('recomended.description') }}</span>
          <USelectMenu
            multiple
            v-model="selectedIndexedFields"
            :items="area.indexedFields as any"
            value-key="id"
            label-key="name"
            :max="3"
            class="min-w-48"
          />
          <UButton variant="ghost" color="neutral" @click="toggleModalCreateField">
            <CirclePlus />
          </UButton>
        </div>
      </USeparator>

      <USeparator class="order-5">
        <div class="flex items-center gap-2">
          <span>{{ t('other.description') }}</span>
          <USelectMenu
            multiple
            v-model="selectedOtherFields"
            :items="area.otherFields as any"
            value-key="id"
            label-key="name"
            :max="3"
            class="min-w-48"
          />
          <UButton variant="ghost" color="neutral" @click="toggleModalCreateField">
            <CirclePlus />
          </UButton>
        </div>
      </USeparator>
    </div>
  </MCard>
</template>
