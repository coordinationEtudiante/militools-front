<script setup lang="ts">
import { createContact } from '@/cloud-functions/contacts/create'
import { editContact } from '@/cloud-functions/contacts/edit'
import ContactCreationInput from '@/components/contacts/ContactCreationInput.vue'
import CreateField from '@/components/contacts/CreateField.vue'
import MCard from '@/components/MCard.vue'
import { router } from '@/router'
import { useAreaStore } from '@/stores/area.store'
import { Button, Divider, Select, SplitButton, Toast, ToggleSwitch } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { CirclePlus } from '@lucide/vue'
import { usePermStore } from '@/stores/perm.store'
import { clearPhone } from '@/tools/phone.utils'

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
    command: () => {
      creationLabel.value = 'one'
    },
  },
  {
    label: t('create-contacts'),
    command: () => {
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
        severity: 'error',
        summary: editMode.value ? t('contact.edit.error') : t('contact.create.error'),
        life: 3000,
      })
      return
    }

    toast.add({
      severity: 'success',
      summary: editMode.value ? t('contact.edit.success') : t('contact.create.success'),
      life: 3000,
    })

    await router.push('/user/contact')
  } catch {
    toast.add({
      severity: 'error',
      summary: editMode.value ? t('contact.edit.error') : t('contact.create.error'),
      life: 3000,
    })
  } finally {
    isLoading.value = false
  }
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
  <Toast />
  <MCard class="w-full">
    <template #header>
      <h2 class="text-2xl tracking-tighter text-balance text-gray-950">
        {{ t('create-contact.title') }}
      </h2>
    </template>

    <div class="flex flex-col gap-4">
      <p class="text-sm text-gray-600">
        {{ t('contact.creation.summary') }}
      </p>

      <CreateField v-model:visible="showCreateFieldsModal" />

      <div v-if="fields.length === 0" class="py-4">
        <Button @click="toggleModalCreateField">{{ t('no-fields-open-modal') }}</Button>
      </div>

      <div class="order-2 flex flex-col flex-wrap gap-4 md:flex-row">
        <ContactCreationInput
          v-for="primaryField in selectedPrimaryFields"
          :key="primaryField.id"
          v-bind="primaryField"
          significance="primary"
          :modelValue="values[primaryField.id] ?? ''"
          @update:modelValue="(val) => updateField(primaryField.id, val)"
          @error="(val) => (errors[primaryField.id] = val)"
          @update:providedField="updateValues"
          @autofilledContact="handleAutofilledContact"
        />
      </div>

      <div class="order-4 flex flex-col flex-wrap gap-4 md:flex-row">
        <ContactCreationInput
          v-for="indexedField in selectedIndexedFields"
          :key="indexedField.id"
          v-bind="indexedField"
          significance="recomended"
          :modelValue="values[indexedField.id] ?? ''"
          @update:modelValue="(val) => updateField(indexedField.id, val)"
          @error="(val) => (errors[indexedField.id] = val)"
          @update:providedField="updateValues"
          @autofilledContact="handleAutofilledContact"
        />
      </div>

      <div class="order-6 flex flex-col flex-wrap gap-4 md:flex-row">
        <ContactCreationInput
          significance="other"
          v-for="otherField in selectedOtherFields"
          :key="otherField.id"
          v-bind="otherField"
          :modelValue="values[otherField.id] ?? ''"
          @update:modelValue="(val) => updateField(otherField.id, val)"
          @error="(val) => (errors[otherField.id] = val)"
        />
      </div>

      <div class="order-7 flex flex-col items-center gap-4 pt-8">
        <label
          v-if="autoCompletedContactId !== null"
          class="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
        >
          <ToggleSwitch v-model="editMode" inputId="edit-existing-contact" />
          <span>{{ t('create-contact.edit-existing') }}</span>
        </label>
        <SplitButton
          :label="creationLabel === 'one' ? t('create-contact') : t('create-contacts')"
          @click="createContactFn"
          :model="buttonItems"
          :disabled="isCreateButtonDisabled || isLoading"
        />
      </div>

      <Divider class="order-1" align="left" type="solid">
        <div class="flex items-center gap-2">
          <span>{{ t('primary.description') }}</span>
          <Select
            multiple
            v-model="selectedPrimaryFields"
            :options="area.primaryFields"
            optionLabel="name"
            filter
            :maxSelectedLabels="3"
            class="min-w-48"
          />
          <Button severity="secondary" text @click="toggleModalCreateField">
            <CirclePlus />
          </Button>
        </div>
      </Divider>

      <Divider class="order-3" align="left" type="solid">
        <div class="flex items-center gap-2">
          <span>{{ t('recomended.description') }}</span>
          <Select
            multiple
            v-model="selectedIndexedFields"
            :options="area.indexedFields"
            optionLabel="name"
            filter
            :maxSelectedLabels="3"
            class="min-w-48"
          />
          <Button severity="secondary" text @click="toggleModalCreateField">
            <CirclePlus />
          </Button>
        </div>
      </Divider>

      <Divider class="order-5" align="left" type="solid">
        <div class="flex items-center gap-2">
          <span>{{ t('other.description') }}</span>
          <Select
            multiple
            v-model="selectedOtherFields"
            :options="area.otherFields"
            optionLabel="name"
            filter
            :maxSelectedLabels="3"
            class="min-w-48"
          />
          <Button severity="secondary" text @click="toggleModalCreateField">
            <CirclePlus />
          </Button>
        </div>
      </Divider>
    </div>
  </MCard>
</template>
