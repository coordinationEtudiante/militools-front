<template>
  <UCard class="h-full w-full overflow-hidden">
    <template #header>
      <div class="flex flex-col gap-1">
        <span class="font-semibold">{{ t('create-contacts.review') }}</span>
        <div class="row flex h-2 w-full gap-4 p-2">
          <div class="h-2 w-full rounded-full bg-primary"></div>
          <div class="h-2 w-full rounded-full bg-primary"></div>
          <div class="h-2 w-full rounded-full bg-primary/20"></div>
        </div>
      </div>
    </template>

    <div class="flex h-full min-h-0 flex-col gap-3 overflow-auto">
      <div
        v-if="totalNb === 0"
        class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-dashed border-default p-8 text-muted"
      >
        <Users class="h-5 w-5" />
        {{ t('create-contacts.no-contact') }}
      </div>
      <template v-else>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div class="flex items-center gap-3 rounded-xl border border-default bg-elevated p-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users class="h-5 w-5" />
            </span>
            <div class="min-w-0">
              <div class="text-2xl font-bold text-highlighted">{{ totalNb }}</div>
              <div class="truncate text-sm text-muted">
                {{ t('create-contacts.review-total') }}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 rounded-xl border border-error/30 bg-error/10 p-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-error/10 text-error">
              <TriangleAlert class="h-5 w-5" />
            </span>
            <div class="min-w-0">
              <div class="text-2xl font-bold text-error">{{ errorNb }}</div>
              <div class="truncate text-sm text-error/80">
                {{ t('create-contacts.review-error') }}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
              <CircleCheck class="h-5 w-5" />
            </span>
            <div class="min-w-0">
              <div class="text-2xl font-bold text-success">{{ validNb }}</div>
              <div class="truncate text-sm text-success/80">
                {{ t('create-contacts.review-valid') }}
              </div>
            </div>
          </div>
        </div>

        <UTabs v-model="activeTab" :items="tabItems" class="shrink-0">
          <template #default="{ item }">
            <span class="flex items-center gap-2">
              <TriangleAlert v-if="item.value === 'error'" class="h-4 w-4" />
              <CircleCheck v-else class="h-4 w-4" />
              {{ item.label }}
              <UBadge :color="item.value === 'error' ? 'error' : 'success'" variant="soft" size="xs">
                {{ item.value === 'error' ? errorNb : validNb }}
              </UBadge>
            </span>
          </template>
          <template #error>
            <div
              v-if="errorNb === 0"
              class="flex items-center justify-center gap-2 rounded-xl border border-dashed border-default p-8 text-muted"
            >
              <CircleCheck class="h-5 w-5 text-success" />
              {{ t('create-contacts.review-error-empty') }}
            </div>
            <div v-else class="grid grid-cols-1 gap-3 xl:grid-cols-2">
              <ContactReviewCard
                v-for="contact in errorContacts"
                :key="contact.rowId"
                :index="contact.rowId"
                :errored="true"
                :fields="fields"
                :contact="contact.data"
                @update:value="(name, value) => onFieldUpdate(contact, name, value)"
              />
            </div>
          </template>
          <template #valid>
            <div
              v-if="validNb === 0"
              class="flex items-center justify-center gap-2 rounded-xl border border-dashed border-default p-8 text-muted"
            >
              <Users class="h-5 w-5" />
              {{ t('create-contacts.review-valid-empty') }}
            </div>
            <div v-else class="grid grid-cols-1 gap-3 xl:grid-cols-2">
              <ContactReviewCard
                v-for="contact in validContacts"
                :key="contact.rowId"
                :index="contact.rowId"
                :errored="false"
                :fields="fields"
                :contact="contact.data"
                @update:value="(name, value) => onFieldUpdate(contact, name, value)"
              />
            </div>
          </template>
        </UTabs>
      </template>
    </div>

    <template #footer>
      <div class="flex w-full items-center justify-between gap-2">
        <UAlert v-if="errorNb > 0" color="warning" size="sm" class="min-w-0">
          {{ t('create-contacts.review-remaining-error', { nb: errorNb }) }}
        </UAlert>
        <span v-else />
        <UButton color="success" variant="solid" @click="goToMerge">{{ t('next') }}</UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import ContactReviewCard from '@/components/contacts/ContactReviewCard.vue'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { usePermStore } from '@/stores/perm.store'
import { isContactValid } from '@/tools/contactValidation.utils'
import { CircleCheck, TriangleAlert, Users } from '@lucide/vue'
import { useToast } from '@nuxt/ui/composables/useToast'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

type ReviewContact = {
  rowId: number
  data: Record<string, string>
  valid: boolean
}

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const { getPerms } = usePermStore()

getPerms([
  ':area/contact/creates',
  ':area/contact/edits',
  ':area/contact/getContactFields',
  ':area/contact/getDuplicate',
])

const fields = ref<{ name: string; type: string }[]>([])
const contacts = ref<ReviewContact[]>([])
const activeTab = ref<'error' | 'valid'>('error')

const tabItems = computed(() => [
  { value: 'error', label: t('create-contacts.review-error'), slot: 'error' },
  { value: 'valid', label: t('create-contacts.review-valid'), slot: 'valid' },
])

const errorContacts = computed(() => contacts.value.filter((contact) => !contact.valid))
const validContacts = computed(() => contacts.value.filter((contact) => contact.valid))

const totalNb = computed(() => contacts.value.length)
const errorNb = computed(() => errorContacts.value.length)
const validNb = computed(() => validContacts.value.length)

onMounted(() => {
  fields.value = DataStorage.getType()
  contacts.value = DataStorage.getValue().map((data, index) => ({
    rowId: index,
    data: { ...data },
    valid: isContactValid(fields.value, data),
  }))

  if (errorNb.value === 0) activeTab.value = 'valid'
})

function onFieldUpdate(contact: ReviewContact, name: string, value: string) {
  const wasValid = contact.valid
  contact.data[name] = value
  contact.valid = isContactValid(fields.value, contact.data)

  if (wasValid !== contact.valid) {
    toast.add({
      color: contact.valid ? 'success' : 'error',
      title: contact.valid ? t('create-contacts.moved-valid') : t('create-contacts.moved-error'),
      duration: 3000,
    })
  }
}

function goToMerge() {
  DataStorage.setArray(
    contacts.value.map((contact) => contact.data),
    DataStorage.getType(),
  )

  router.push({ name: '/user/contact/creates/merge' })
}
</script>